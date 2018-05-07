package com.architecture.common.util

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager

/**
 * Created by Administrator on 2018/4/27.
 */
object Util{
    /**
     * 判断App是否是Debug版本
     *
     * @return `true`: 是<br></br>`false`: 否
     */
    fun isAppDebug(context:Context): Boolean {
        if (context.packageName.isNullOrEmpty()) return false
        try {
            val pm = context.packageManager
            val ai = pm.getApplicationInfo(context.packageName, 0)
            return ai != null && ai!!.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0
        } catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
            return false
        }

    }

}