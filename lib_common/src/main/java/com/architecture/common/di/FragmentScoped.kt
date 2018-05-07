package com.architecture.common.di

import java.lang.annotation.ElementType
import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy
import java.lang.annotation.Target
import javax.inject.Scope

/**
 * Created by Administrator on 2018/1/17.
 */
@Scope
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE, ElementType.METHOD)
annotation class FragmentScoped