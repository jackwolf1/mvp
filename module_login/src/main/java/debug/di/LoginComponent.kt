package debug.di

import com.architecture.common.base.BaseApplication
import com.architecture.common.di.ApplicationModule
import com.architecture.common.di.OkhttpModule
import com.architecture.common.di.RetrofitModule
import com.mvp.tfkj.login.module.LoginModule
import com.mvp.tfkj.login.module.ModelModule
import dagger.BindsInstance
import dagger.Component
import dagger.android.AndroidInjector
import dagger.android.support.AndroidSupportInjectionModule
import javax.inject.Singleton


@Singleton
@Component(modules =
[  (LoginModule::class),
    (ModelModule::class),
(ApplicationModule::class),
(AndroidSupportInjectionModule::class),
(OkhttpModule::class),
(RetrofitModule::class)
])
interface LoginComponent: AndroidInjector<BaseApplication>{

    // Gives us syntactic sugar. we can then do DaggerAppComponent.builder().application(this).build().inject(this);
    // never having to instantiate any modules or say which module we are passing the application to.
    // Application will just be provided into our app graph now.
    @Component.Builder
    interface Builder {
        @BindsInstance
        fun application(application: BaseApplication): Builder

        fun build(): LoginComponent
    }
}