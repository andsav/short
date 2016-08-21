<?php

use \DTS\eBaySDK\Constants;
use \DTS\eBaySDK\Trading\Services;
use \DTS\eBaySDK\Trading\Types;
use \DTS\eBaySDK\Trading\Enums;

require '_.php';

$orders_raw = $db->query('SELECT o.*, l.*, b.*, b.`price` AS `cost`
                      FROM `orders` o 
                        LEFT JOIN `listings` l ON l.id = o.listingId
                        LEFT JOIN `books` b ON b.isbn = l.isbn
                      ORDER BY listingId');

usort($orders_raw, function ($a, $b) {
    return strtotime($b['date']) - strtotime($a['date']);
});

if (isset($_POST['list'])) {

    $service = new Services\TradingService([
        'credentials' => EBAY_PRODUCTION_CREDENTIALS,
        'authToken' => EBAY_PRODUCTION_TOKEN,
        'siteId' => Constants\SiteIds::US
    ]);

    $request = new Types\GetOrdersRequestType();
    $request->RequesterCredentials->eBayAuthToken = EBAY_PRODUCTION_TOKEN;

    $request->DetailLevel = ['ReturnAll'];
    $request->OrderStatus = Enums\OrderStatusCodeType::C_COMPLETED;

    $request->NumberOfDays = 5;

    while (1) {
        $response = $service->getOrders($request);
        $ordersArray = $response->toArray();
        $ordersRaw = $ordersArray['OrderArray']['Order'];

        foreach ($ordersRaw as $o) {
            foreach ($o['TransactionArray']['Transaction'] as $t) {
                if (isset($orders_raw[(int)$t['TransactionID']]))
                    continue;

                $db->insert('orders', [
                    'transactionId' => (int)$t['TransactionID'],
                    'listingId' => (int)$t['Item']['ItemID'],
                    'quantity' => (int)$t['QuantityPurchased'],
                    'paid' => (float)$t['TransactionPrice']['value'],
                    'buyer_id' => $o['BuyerUserID'],
                    'buyer_email' => $t['Buyer']['Email'],
                    'date' => date('Y-m-d H:i:s', strtotime($o['PaidTime'])),
                    'paypal_fee' => (float)$t['TransactionPrice']['value'] * 0.029 + 0.3,
                    'ebay_fee' => round((float)$t['TransactionPrice']['value'] * 0.09, 2),
                    'shipping_name' => $o['ShippingAddress']['Name'],
                    'shipping_street' => $o['ShippingAddress']['Street1'],
                    'shipping_street2' => $o['ShippingAddress']['Street2'],
                    'shipping_city' => $o['ShippingAddress']['CityName'],
                    'shipping_state' => $o['ShippingAddress']['StateOrProvince'],
                    'shipping_country' => $o['ShippingAddress']['CountryName'],
                    'shipping_zip' => $o['ShippingAddress']['PostalCode'],
                    'shipping_phone' => $o['ShippingAddress']['Phone']
                ]);

            }
        }

        if (!$ordersArray['HasMoreOrders'])
            break;
    }
    die;
}

if (isset($_POST['transaction_id'], $_POST['status'])) {
    $success = $db->query("UPDATE `orders` SET `status` = '{$_POST['status']}' WHERE `transactionId` = '{$_POST['transaction_id']}'");
    echo json_encode($success);
    die;
}

if (isset($_POST['transaction_id'], $_POST['bd_id'])) {
    $success = $db->query("UPDATE `orders` SET `bd_id` = '{$_POST['bd_id']}' WHERE `transactionId` = '{$_POST['transaction_id']}'");
    echo json_encode($success);
    die;
}


$total_ordered = $total_dispatched = $total_opened = 0;

?>

<center>
    <button id="filter" class="pure-button pure-button-primary" onclick="$('tbody').html($('.tr_open').get().reverse())">
        Filter Open
    </button>
    <br><br>

    <table class="pure-table">
        <thead>
        <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Book</th>
            <th>Address</th>
            <th>Profit</th>
            <th>Status</th>
            <th>BD ID</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($orders_raw as $o): ?>

            <?php if ($o['status'] == 'ordered') $total_ordered++;
            elseif ($o['status'] == 'dispatched') $total_dispatched++;
            else $total_opened++; ?>

            <tr style="border-bottom: 1px solid #ddd;"
                class="tr_<?= $o['status'] ?>"
                data-id="<?= $o['transactionId'] ?>" data-status="<?= $o['status'] ?>">
                <td><?= $o['transactionId'] ?></td>
                <td><?= $o['date'] ?></td>
                <td><?= $o['name'] ?></td>
                <td>
                    <small>
                        <?= $o['shipping_name'] ?><br>
                        <?= $o['shipping_street'] ?><br>
                        <?= (!empty($o['shipping_street2']) ? $o['shipping_street2'] . '<br>' : '') ?>
                        <?= $o['shipping_city'] ?><br>
                        <?= $o['shipping_state'] ?><br>
                        <?= $o['shipping_zip'] ?><br>
                        <?= $o['shipping_country'] ?><br>
                        <?= $o['shipping_phone'] ?><br>
                    </small>
                </td>
                <td><?= ($o['paid'] - $o['ebay_fee'] - $o['paypal_fee'] - USD_GBP * $o['cost']) ?></td>
                <td><?= $o['status'] ?></td>
                <td>
                    <?php if (!empty($o['bd_id'])): ?>
                        <?= $o['bd_id'] ?>
                    <?php else: ?>
                        <form method="post" action="orders.php" class="update_bd_id pure-form">
                            <input type="hidden" name="transaction_id" value="<?= $o['transactionId'] ?>">

                            <input type="text" name="bd_id" class="pure-input">
                            <input type="submit" value="Update" class="pure-button pure-button ">
                        </form>
                    <?php endif ?>
                </td>
            </tr>
        <?php endforeach ?>
        </tbody>
    </table>

    <div id="totals">
        <?= round($total_dispatched / count($orders_raw) * 100, 2) ?>% &nbsp;
        &nbsp; <?= round(($total_dispatched + $total_ordered) / count($orders_raw) * 100, 2) ?>% <br><br><br>
    </div> <span id="opened_count">(<?= $total_opened ?>)</span>

</center>

