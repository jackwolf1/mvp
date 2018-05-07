package com.architecture.common.di

import android.app.Application
import com.architecture.common.base.BaseApplication
import dagger.BindsInstance
import dagger.Component
import dagger.Subcomponent
import dagger.android.AndroidInjector
import dagger.android.support.AndroidSupportInjectionModule
import javax.inject.Singleton

/**
 * This is a Dagger component. Refer to {@link BaseApplication} for the list of Dagger components
 * used in this application.
 * <p>
 * Even though Dagger allows annotating a {@link Component} as a singleton, the code
 * itself must ensure only one instance of the class is created. This is done in {@link
 * ToDoApplication}.
 * //{@link AndroidSupportInjectionModule}
 * // is the module from Dagger.Android that helps with the generation
 * // and location of subcomponents.
 */
/**
 * @see ModelModule 数据模型注入
 * @see ApiModule 网络连接注入
 * Created by Administrator on 2018/1/17.
 */

@Component(modules = [(ApplicationModule::class),
(AndroidSupportInjectionModule::class),
(OkhttpModule::class),
(RetrofitModule::class)
])
interface AppComponent: AndroidInjector<BaseApplication>{

    // Gives us syntactic sugar. we can then do DaggerAppComponent.builder().application(this).build().inject(this);
    // never having to instantiate any modules or say which module we are passing the application to.
    // Application will just be provided into our app graph now.
    @Component.Builder
    interface Builder {
        @BindsInstance
        fun application(application: BaseApplication): Builder

        fun build(): AppComponent
    }
}