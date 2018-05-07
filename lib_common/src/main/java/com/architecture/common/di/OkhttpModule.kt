package com.architecture.common.di

import android.text.TextUtils
import com.architecture.common.base.BaseApplication

import java.util.concurrent.TimeUnit

import javax.inject.Singleton

import dagger.Module
import dagger.Provides
import com.architecture.common.di.Cache
import okhttp3.*
import okhttp3.logging.HttpLoggingInterceptor
import java.io.File

/**
 * Created by Administrator on 2018/4/26.
 */

@Module
class OkhttpModule {

    @Singleton
    @Provides
    @Cache
    fun cacheOkHttpClient(): OkHttpClient {
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY
        // 指定缓存路径,缓存大小100Mb
        val cache = Cache(File(BaseApplication.context().cacheDir, "HttpCache"),
                (1024 * 1024 * 100).toLong())
        val cacheInterceptor = Interceptor { chain ->
            val request = chain.request()
            val response = chain.proceed(request)
            //@Headers("Cache-Control:public ,max-age=60")可以在retrofit请求中设置
            var cacheControl = request.cacheControl().toString()
            if (TextUtils.isEmpty(cacheControl)) {
                cacheControl = "public, max-age=" + 3600 * 6 + " ,max-stale=2419200"
            }
            response.newBuilder()
                    .header("Cache-Control", cacheControl)
                    .removeHeader("Pragma")//清除头信息，因为服务器如果不支持，会返回一些干扰信息，不清除下面无法生效
                    .build()
        }
        return OkHttpClient.Builder()
                .addNetworkInterceptor(interceptor)
                .addNetworkInterceptor(cacheInterceptor)//添加自定义缓存拦截器
                .retryOnConnectionFailure(true)
                .connectTimeout(10, TimeUnit.SECONDS)//设置连接超时
                .readTimeout(10, TimeUnit.SECONDS)//读取超时
                .writeTimeout(10, TimeUnit.SECONDS)//写入超时
                .cache(cache)
                .build()
    }

    @Singleton
    @Provides
    @Remote
    fun remoteOkHttpClient(): OkHttpClient {
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY
        return OkHttpClient.Builder()
                .addNetworkInterceptor(interceptor)
                .retryOnConnectionFailure(true)
                .connectTimeout(10, TimeUnit.SECONDS)//设置连接超时
                .readTimeout(10, TimeUnit.SECONDS)//读取超时
                .writeTimeout(10, TimeUnit.SECONDS)//写入超时
                .build()
    }
}