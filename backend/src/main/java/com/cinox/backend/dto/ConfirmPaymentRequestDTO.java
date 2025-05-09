package com.cinox.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ConfirmPaymentRequestDTO {

    private String razorpayOrderId;
    private String razorpayPaymentId;

}
