package com.netcracker.intarface;

import com.netcracker.entity.OrderHistory;

import java.io.Serializable;
import java.util.List;

public interface IDiscountService extends Serializable {
    String getDiscountName(List<OrderHistory> orderHistories);
}
