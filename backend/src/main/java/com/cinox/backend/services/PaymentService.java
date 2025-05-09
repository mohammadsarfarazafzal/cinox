package com.cinox.backend.services;

import com.cinox.backend.dto.PaymentDTO;
import com.cinox.backend.entities.PaymentEntity;
import com.cinox.backend.repositories.IBookingRepository;
import com.cinox.backend.repositories.IPaymentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentService implements IPaymentService {

    @Autowired
    private IPaymentRepository paymentRepository;

    @Autowired
    private IBookingRepository bookingRepository;

    private final ModelMapper mapper = new ModelMapper();

    @Value("${razorpay.key_id}")
    private String keyId;

    @Value("${razorpay.key_secret}")
    private String keySecret;


    @Override
    public PaymentDTO addPayment(PaymentDTO payment) {
        PaymentEntity entity = mapper.map(payment,PaymentEntity.class);
        return mapper.map(paymentRepository.save(entity),PaymentDTO.class);
    }

    @Override
    public PaymentDTO getPaymentById(Long id) {
        Optional<PaymentEntity> entity = paymentRepository.findById(id);
        if (entity.isPresent()){
            return mapper.map(entity.get(),PaymentDTO.class);
        }
        return null;
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        List<PaymentEntity> entities = paymentRepository.findAll();
        return entities.stream().map(entity->mapper.map(entity,PaymentDTO.class)).collect(Collectors.toList());
    }
}
