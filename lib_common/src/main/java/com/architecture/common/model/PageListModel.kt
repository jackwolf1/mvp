package com.architecture.common.model

/**
 * Created by Administrator on 2018/3/5 0005.
 */
class PageListModel {

    //获取一页中内容限制
    val size: Int = 20
    //下一次开始
    var nextStart: Int = 0

    fun refresh() {
        nextStart = 0
    }

}
