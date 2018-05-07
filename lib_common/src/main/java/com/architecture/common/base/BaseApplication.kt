package com.architecture.common.base

import android.content.Context
import android.support.multidex.MultiDex
import com.alibaba.android.arouter.launcher.ARouter
import com.apkfuns.logutils.LogUtils
import com.architecture.common.di.DaggerAppComponent
import com.architecture.common.util.Util
import dagger.android.AndroidInjector
import dagger.android.DaggerApplication

abstract class BaseApplication : DaggerApplication() {

    override fun onCreate() {
        // TODO Auto-generated method stub
        super.onCreate()

        init()

    }

    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }

    override fun applicationInjector(): AndroidInjector<out DaggerApplication> {
        return DaggerAppComponent.builder().application(this).build()
    }


    /**
     * 初始化数据
     */
    private fun init() {
        instance = this


        //开启InstantRun之后，一定要在ARouter.init之前调用openDebug
        if(Util.isAppDebug(this)) {
            ARouter.openDebug()
            ARouter.openLog()
        }
        ARouter.init(this)

        LogUtils.getLogConfig()
                .configAllowLog(true)
                .configTagPrefix("xuying")
                .configShowBorders(true)
                .configFormatTag("%d{HH:mm:ss:SSS} %t %c{-5}")
    }

    companion object {
        var instance: BaseApplication? = null

        @Synchronized
        fun context(): Context {
            return instance!!.applicationContext
        }
    }
}
