package com.cinox.backend.services;

import com.cinox.backend.dto.PaymentDTO;

import java.util.List;

public interface IPaymentService {

    public PaymentDTO addPayment(PaymentDTO payment);
    public PaymentDTO getPaymentById(Long id);
    public List<PaymentDTO> getAllPayments();

}
