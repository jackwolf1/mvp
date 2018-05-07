package com.architecture.common.model.data;

import java.util.List;

/**
 * 列表数据
 * Created by Administrator on 2016/9/23.
 */
public class BaseListDto<T> extends BaseDto {
    private List<T> data;

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
