package com.architecture.common.di

import com.architecture.common.config.WebConstants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Created by Administrator on 2018/4/26.
 */

class TestRetrofit(okHttpClient: OkHttpClient) {
    companion object {
        private val BASE_URL = WebConstants.Web
        lateinit var retrofit: Retrofit
    }
    init {
        retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(okHttpClient)
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build()
    }


    fun getRetrofit(): Retrofit {
        return retrofit
    }


}
