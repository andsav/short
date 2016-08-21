<?php
use \DTS\eBaySDK\Constants;
use \DTS\eBaySDK\Trading\Services;
use \DTS\eBaySDK\Trading\Types;
use \DTS\eBaySDK\Trading\Enums;

require '_.php';

if (isset($_POST['list'])) {

    try {
        if (!isset($_POST['book_title'],
            $_POST['book_description'],
            $_POST['book_isbn'],
            $_POST['book_picture'],
            $_POST['book_price'],
            $_POST['book_author'])
        ) {
            throw new ErrorException('Missing POST fields');
        }

        $title = $_POST['book_title'] . ' by ' . $_POST['book_author'] . " (Brand New - Free Shipping)";
        $description = <<<EOT

            <table border="1" width="100%" height="19">
              <tr>
                <td width="100%" height="13">
                  <table border="0" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="90%">
                        <blockquote>
                          <blockquote>
                            <blockquote>
                        <h1 align="center">{$_POST['book_title']}</h1>
                        <h3 align="center">by <strong>{$_POST['book_author']}</strong></h3>
            
                        <p align="left">{$_POST['book_description']}</p>
                            </blockquote>
                          </blockquote>
                        </blockquote>
                        <p align="center">&nbsp;</p>
                      </td>
                      <td width="10%" bgcolor="#40C0FF">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <table border="0" width="100%" height="19">
              <tr>
                <td width="20%" valign="top" height="1"></td>
                <td width="80%" valign="top" height="1"></td>
              </tr>
            </table>
              <table border="0" width="100%" height="22">
                <tr>
                  <td width="100%" valign="top" height="1" bgcolor="#40C0FF" colspan="2"><font color="#FFFFFF" face="Arial" size="4"><b>Additional Information</b></font></td>
                </tr>
              </table>
            
            <table border="0" width="100%" height="119">
              <tr>
                <td width="20%" valign="top" height="48"><b><font face="Verdana" size="2">Shipping
                  Details:</font></b></td>
                <td width="80%" valign="top" height="48" align="left"><font face="Verdana" size="2">
                    <strong>We offer free worldwide shipping!</strong>
                    Your book will be shipped within 2 business days from the UK using Royal Mail.<br>
                    Once your order has been dispatched, delivery estimates are as follows: <br>
                    <ul style="list-style-type:none">
                        <li><strong>United Kingdom</strong>: 3-7 business days</li>
                        <li><strong>Rest of Europe</strong>: 4-12 business days</li>
                        <li><strong>United States &amp; Canada</strong>: 5-12 business days</li>
                        <li><strong>Australia &amp; New Zealand</strong>: 5-12 business days</li>
                        <li><strong>South America</strong>: 10-18 business days</li>
                        <li><strong>Other Countries</strong>: 7-15 business days</li>
                    </ul>
                </font></td>
              </tr>
              <tr>
                <td width="20%" valign="top" height="13"><font face="Verdana" size="2">&nbsp;</font></td>
                <td width="80%" valign="top" height="13"><font face="Verdana" size="2">&nbsp;</font></td>
              </tr>
              <tr>
                <td width="20%" valign="top" height="67"><b><font face="Verdana" size="2">Contact:</font></b></td>
                <td width="80%" valign="top" height="67" align="left"><font face="Verdana" size="2">
                We aim to offer you a positive shopping experience obtain positive feedback. <br>
                Please contact us if you are unsatisfied with your product or you intend to leave negative feedback and we will try to make things right!
                </font></td>
              </tr>
              <tr>
                <td width="20%" valign="top" height="11"><font face="Verdana" size="2">&nbsp;</font></td>
                <td width="80%" valign="top" height="11">
                  <font face="Verdana" size="2">&nbsp;</font>
                </td>
              </tr>
              <tr>
              <td colspan="2" align="center"><h3>Thank you for your business!</h3></td>
              </tr>
            </table>
EOT;


        $siteId = Constants\SiteIds::US;
        $service = new Services\TradingService([
            'credentials' => EBAY_PRODUCTION_CREDENTIALS,
            'authToken' => EBAY_PRODUCTION_TOKEN,
            'siteId' => Constants\SiteIds::US
        ]);

        $request = new Types\AddFixedPriceItemRequestType();

        $request->RequesterCredentials = new Types\CustomSecurityHeaderType();
        $request->RequesterCredentials->eBayAuthToken = EBAY_PRODUCTION_TOKEN;

        $item = new Types\ItemType();
        $item->ListingType = Enums\ListingTypeCodeType::C_FIXED_PRICE_ITEM;
        $item->Quantity = 99;
        $item->ListingDuration = Enums\ListingDurationCodeType::C_GTC;
        $item->StartPrice = new Types\AmountType(['value' => (double)$_POST['book_price']]);
        $item->BestOfferDetails = new Types\BestOfferDetailsType();
        $item->BestOfferDetails->BestOfferEnabled = false;

        $item->ProductListingDetails = new Types\ProductListingDetailsType();
        $item->ProductListingDetails->ISBN = $_POST['book_isbn'];

        $item->Title = strlen($title) < 80 ? $title : $_POST['book_title'];
        $item->Description = $description;

        $item->Country = 'GB';
        $item->Location = 'Leicester';
        $item->PostalCode = 'LE3 8EA';

        $item->Currency = 'USD';

        $item->PictureDetails = new Types\PictureDetailsType();
        $item->PictureDetails->GalleryType = Enums\GalleryTypeCodeType::C_GALLERY;
        $item->PictureDetails->PictureURL = [$_POST['book_picture']];

        $item->PrimaryCategory = new Types\CategoryType();
        $item->PrimaryCategory->CategoryID = '171228';

        $item->ConditionID = 1000;

        $item->PaymentMethods = [
            'PayPal'
        ];
        $item->PayPalEmailAddress = MY_EMAIL;
        $item->DispatchTimeMax = 2;

        $item->ShippingDetails = new Types\ShippingDetailsType();
        $item->ShippingDetails->ShippingType = Enums\ShippingTypeCodeType::C_FLAT;

        $shippingService = new Types\ShippingServiceOptionsType();
        $shippingService->ShippingServicePriority = 1;
        $shippingService->ShippingService = 'EconomyShippingFromOutsideUS';
        $shippingService->ShippingServiceCost = new Types\AmountType(['value' => 0.00]);
        $shippingService->ShippingServiceAdditionalCost = new Types\AmountType(['value' => 0.00]);
        $item->ShippingDetails->ShippingServiceOptions[] = $shippingService;


        $shippingService = new Types\InternationalShippingServiceOptionsType();
        $shippingService->ShippingServicePriority = 1;
        $shippingService->ShippingService = 'StandardInternational';
        $shippingService->ShippingServiceCost = new Types\AmountType(['value' => 0.00]);
        $shippingService->ShippingServiceAdditionalCost = new Types\AmountType(['value' => 0.00]);
        $shippingService->ShipToLocation = ['WorldWide'];
        $item->ShippingDetails->InternationalShippingServiceOption[] = $shippingService;

        $item->ReturnPolicy = new Types\ReturnPolicyType();
        $item->ReturnPolicy->ReturnsAcceptedOption = 'ReturnsAccepted';
        $item->ReturnPolicy->RefundOption = 'MoneyBack';
        $item->ReturnPolicy->ReturnsWithinOption = 'Days_14';
        $item->ReturnPolicy->ShippingCostPaidByOption = 'Buyer';

        $request->Item = $item;
        $response = $service->addFixedPriceItem($request);
        if (isset($response->Errors)) {
            foreach ($response->Errors as $error) {
                $err = sprintf(
                    "%s: %s\n%s\n\n",
                    $error->SeverityCode === Enums\SeverityCodeType::C_ERROR ? 'Error' : 'Warning',
                    $error->ShortMessage,
                    $error->LongMessage
                );

                throw new ErrorException($err);
            }
        }

        if ($response->Ack == 'Failure') {
            throw new ErrorException('Item not inserted');
        }

        $db->insert('listings', [
            'id' => (int)$response->__get('ItemID'),
            'isbn' => (int)$_POST['book_isbn'],
            'price' => (double)$_POST['book_price']
        ]);


        echo json_encode($response->toArray());

    } catch (ErrorException $e) {
        echo json_encode(['ERROR' => $e->getMessage()], JSON_PRETTY_PRINT);
    }
    die;

}

$books = $db->query('SELECT b.* FROM `books` b WHERE b.`isbn` NOT IN (SELECT l.`isbn` FROM `listings` l)');

?>

<center>
    <button id="run_list" class="pure-button pure-button-primary">List Items</button>
    <br><br>
    
    <table class="pure-table">
        <thead>
        <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>BD Cost (£)</th>
            <th>List for ($)</th>
            <th style="display:none">URL</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($books as $b): ?>
            <tr>
                <td class="isbn"><?= $b['isbn'] ?></td>
                <td class="title"><?= $b['name'] ?></td>
                <td class="author"><?= $b['contributor'] ?></td>
                <td class="cost"><?=$b['price']?></td>
                <td class="price"><?= list_price($b['price']) ?></td>
                <td class="url" style="display:none"><?= $b['url'] ?></td>
            </tr>
        <?php endforeach ?>
        </tbody>
    </table>
</center>

