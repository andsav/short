CREATE TABLE `books` (
  `isbn` bigint(15) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `contributor` varchar(255) NOT NULL,
  `url` varchar(512) NOT NULL,
  `price` float(5,2) unsigned NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `listings` (
  `id` bigint(15) unsigned NOT NULL,
  `isbn` bigint(15) unsigned NOT NULL,
  `price` double(5,2) NOT NULL,
  `listed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `orders` (
  `transactionId` bigint(15) unsigned NOT NULL,
  `listingId` bigint(15) unsigned NOT NULL,
  `quantity` int(3) unsigned NOT NULL,
  `paid` float(5,2) NOT NULL,
  `buyer_id` varchar(64) NOT NULL,
  `buyer_email` varchar(64) NOT NULL,
  `date` datetime NOT NULL,
  `paypal_fee` float(5,2) NOT NULL,
  `ebay_fee` float(5,2) NOT NULL,
  `shipping_name` varchar(250) NOT NULL,
  `shipping_street` varchar(250) NOT NULL,
  `shipping_street2` varchar(250) NOT NULL,
  `shipping_city` varchar(32) NOT NULL,
  `shipping_state` varchar(32) NOT NULL,
  `shipping_country` varchar(32) NOT NULL,
  `shipping_zip` varchar(16) NOT NULL,
  `shipping_phone` varchar(32) NOT NULL,
  `status` enum('open','ordered','dispatched') NOT NULL DEFAULT 'open',
  `bd_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`transactionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1