package com.architecture.common.di

import java.lang.annotation.Documented
import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy
import javax.inject.Qualifier


/**
 * 有缓存的请求
 * Created by xuying on 2018/1/26.
 */
@Qualifier
@Documented
@Retention(RetentionPolicy.RUNTIME)
annotation class Cache
