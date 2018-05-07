package com.architecture.common.ui.recyclerview;

import android.support.v4.widget.SwipeRefreshLayout;

/**
 * Created by Administrator on 2016/8/15.
 */
public class SwipeRefreshView {


    public static void init(SwipeRefreshLayout swipeRefreshLayout) {
        swipeRefreshLayout.setColorSchemeResources(android.R.color.holo_purple, android.R.color.holo_blue_bright, android.R.color.holo_orange_light,
                android.R.color.holo_red_light);
    }


}