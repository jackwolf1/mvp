package com.mvp.tfkj.lib_model.login.service;


import com.architecture.common.model.data.BaseDto;
import com.mvp.tfkj.lib_model.login.data.UserLoginDto;


import io.reactivex.Observable;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

/**
 * Created by Administrator on 2016/10/8.
 */

public interface AccountService {



    //登录
    @FormUrlEncoded
    @POST("api/store/account/login")
    Observable<UserLoginDto> login(@Field("phone") String phone,
                                   @Field("password") String password);


}
