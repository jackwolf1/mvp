package com.architecture.common.base

import android.support.v7.widget.RecyclerView
import java.util.*

/**
 * Created by xuying on 2018/2/13.
 */

abstract class BaseAdapter<T, VH : RecyclerView.ViewHolder> : RecyclerView.Adapter<VH>() {
    protected var list: MutableList<T> = ArrayList()
        private set

    fun add(data: MutableList<T>) {
        list.addAll(data)
    }

    fun refresh(data: MutableList<T>) {
        list.clear()
        if (data != null)
            list.addAll(data)
    }

    fun changed(data: MutableList<T>, index: Int) {
        if (data != null) {
            for (i in data.indices) {
                list[i + index] = data[i]
            }
        }

    }


    override fun getItemCount(): Int {
        return list.size
    }

    /**
     * 设置监听器
     */
    protected var mListener: ((result: T) -> Unit)? = null

    fun setOnClickListener(listener: ((result: T) -> Unit)) {
        mListener = listener
    }

}