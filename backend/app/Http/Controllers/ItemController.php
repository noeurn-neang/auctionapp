<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\BidHistory;
use App\Models\AutoBiddingConfig;
use App\Utils\DummyUsers;

class ItemController extends Controller
{
    public function list(Request $request) {
        $q = $request->q;
        $sort = $request->sort;

        $items = Item::query();

        // // filte by name or description
        if($q != null) {
            $items = $items->where('name', 'like', '%'.$q.'%');
        }
        
        // sort by price
        if($sort != null) {
            $items = $items->orderBy('price', $sort)->paginate(10);
        } else {
            $items = $items->paginate(10);
        }

        return response()->json([
            'data' => $items
        ]);
    }

    public function detail(Request $request, Item $item) {
        $userId = $request->header('user_id');
        $item['histories'] = $this->prepareBidHistories($item->histories);
        $item['autoBiddingConfig'] = $item->autoBiddingConfigs()->where('user_id', $userId)->first();
        return response()->json([
            'data' => $item
        ]);
    }

    public function bid(Request $request) {
        $request->validate([
            'itemId' => 'required',
            'amount' => 'required'
        ]);

        $itemId = $request->itemId;
        $amount = $request->amount;
        $userId = $request->header('user_id');

        // Check if item is exist
        $item = Item::find($itemId);
        if($item == null) {
            return response()->json([
                'msg' => 'Item not found!'
            ]);
        }

        // Check Closing Date
        if($item->closing_date <= now()) {
            return response()->json([
                'msg' => 'This item is closed!'
            ]);
        }

        // Check Bid amount
        if($item->last_bid_amount >= $amount || $item->price > $amount) {
            return response()->json([
                'msg' => 'Incorrect bid amount!'
            ]);
        }

        $this->saveBid($item, $amount, $userId);

        return response()->json([
            'data' => [
                'last_bid_amount' => $amount,
                'histories' => $this->prepareBidHistories($item->histories)
            ]
        ]);
    }

    public function configAutoBidding(Request $request) {
        $request->validate([
            'itemId' => 'required',
            'maxBidAmount' => 'required'
        ]);

        $itemId = $request->itemId;
        $maxBidAmount = $request->maxBidAmount;
        $userId = $request->header('user_id');

        // Check if exist
        $config = AutoBiddingConfig::where([
            'user_id' => $userId,
            'item_id' => $itemId
        ])->first();
        if($config == null) {
            $config = new AutoBiddingConfig();
        }
        $config->item_id = $itemId;
        $config->user_id = $userId;
        $config->max_bid_amount = $maxBidAmount;
        $config->status = true;
        $config->save();

        return response()->json([
            'data' => $config
        ]);
    }

    public function disableAutoBidding(Request $request) {
        $request->validate([
            'itemId' => 'required'
        ]);

        $itemId = $request->itemId;
        $userId = $request->header('user_id');

        $config = AutoBiddingConfig::where([
            'user_id' => $userId,
            'item_id' => $itemId
        ])->first();

        $config->status = false;
        $config->save();

        return response()->json([
            'data' => $config
        ]);
    }

    /**
     * Save bid
     * @param $item
     * @param $amount
     * @param $userId
     * 
     * @return BidHistories
     */
    private function saveBid($item, $amount, $userId) {
        // Save to bid hostory
        $bid = new BidHistory();
        $bid->item_id = $item->id;
        $bid->user_id = $userId;
        $bid->bid_amount = $amount;
        $bid->save();
    }

    /**
     * Prepare bid histories data with user
     * @param $histories
     * 
     * @return BidHistories
     */
    private function prepareBidHistories($histories) {
        $arr = [];
        foreach($histories as $hi) {
            $hi['user'] = DummyUsers::findUserById($hi->user_id);
            $arr[] = $hi;

        }

        return $arr;
    }
}
