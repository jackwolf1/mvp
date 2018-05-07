package com.architecture.common.di

import com.architecture.common.di.Cache
import com.architecture.common.di.Remote

import javax.inject.Named
import javax.inject.Singleton

import dagger.Module
import dagger.Provides
import okhttp3.OkHttpClient

/**
 * Created by Administrator on 2018/4/26.
 */

@Module
class RetrofitModule {

    @Singleton
    @Provides
    fun providerLocalRetrofit(@Cache okHttpClient: OkHttpClient): DefaultRetrofit {
        return DefaultRetrofit(okHttpClient)
    }

    @Singleton
    @Provides
    fun providerRemoteRetrofit(@Remote okHttpClient: OkHttpClient): TestRetrofit {
        return TestRetrofit(okHttpClient)
    }
}