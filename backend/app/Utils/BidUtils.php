<?php

namespace App\Utils;

use App\Models\Item;
use App\Models\AutoBiddingConfig;

class BidUtils {
    private $item;
    private $userId;

    public function __construct(Item $item, $userId) {
        $this->item = $item;
        $this->userId = $userId;
    }

    public function runAutoBidding() {
        $maxAutoBidConfgs = AutoBiddingConfig::where('max_bid_amount', '>', $item->last_bid_amount)->where('user_id', $userId);
        $lastBid = null;
        if($maxAutoBidConfgs->count() > 0) {
            foreach($maxAutoBidConfgs->all() as $conf) {
                dd($conf);
            }
        }

        return $lastBid;
    }
}