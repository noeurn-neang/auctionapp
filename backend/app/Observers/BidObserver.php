<?php

namespace App\Observers;

use App\Models\BidHistory;
use App\Models\Item;
use App\Models\AutoBiddingConfig;

class BidObserver
{
    public $afterCommit = false;
    
    /**
     * Handle the BidHistory "created" event.
     *
     * @param  \App\Models\BidHistory  $bidHistory
     * @return void
     */
    public function created(BidHistory $bidHistory)
    {
        // auto update last bid amount
        $item = Item::find($bidHistory->item_id);
        $item->last_bid_amount = $bidHistory->bid_amount;
        $item->save();

        // auto bidding process
        $autoBid = AutoBiddingConfig::where('status', true)
            ->where('user_id', '!=', $bidHistory->user_id)
            ->where('item_id', $bidHistory->item_id)
            ->where('max_bid_amount', '>', $bidHistory->bid_amount)
            ->orderBy('max_bid_amount', 'asc')
            ->first();
        if($autoBid != null) {
            $newBidAmount = $bidHistory->bid_amount + 1;
            $newBid = new BidHistory();
            $newBid->user_id = $autoBid->user_id;
            $newBid->item_id = $bidHistory->item_id;
            $newBid->bid_amount = $newBidAmount;
            $newBid->save();
        }
    }
}
