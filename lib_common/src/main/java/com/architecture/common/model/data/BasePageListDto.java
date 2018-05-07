package com.architecture.common.model.data;

/**
 * 分页列表数据
 * "data": {
 * "nextStart": 0,
 * "size": 0,
 * "list": [
 * {
 * "id": 0,
 * "userId": 0,
 * …
 * }
 * ]
 * }
 * <p>
 * Created by Administrator on 2016/9/23.
 */
public class BasePageListDto<T> extends BaseDto {

    private BasePagerListData<T> data;

    public BasePagerListData<T> getData() {
        return data;
    }

    public void setData(BasePagerListData<T> data) {
        this.data = data;
    }


}
