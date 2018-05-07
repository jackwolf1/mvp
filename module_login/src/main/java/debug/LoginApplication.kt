package debug


import com.architecture.common.base.BaseApplication
import debug.di.DaggerLoginComponent
import dagger.android.AndroidInjector
import dagger.android.DaggerApplication

/**
 * Created by dxx on 2017/11/15.
 * 组件化编译的时候才生效
 */

class LoginApplication : BaseApplication() {

    override fun applicationInjector(): AndroidInjector<out DaggerApplication> {
        return DaggerLoginComponent.builder().application(this).build()
    }
}
