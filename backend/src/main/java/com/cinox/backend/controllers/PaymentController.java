package com.cinox.backend.controllers;

import com.cinox.backend.dto.*;
import com.cinox.backend.services.IBookingService;
import com.cinox.backend.services.IPaymentService;
import com.cinox.backend.services.IShowService;
import com.cinox.backend.services.IUserService;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${razorpay.key_id}")
    private String keyId;

    @Value("${razorpay.key_secret}")
    private String keySecret;

    @Autowired
    IPaymentService paymentService;

    @Autowired
    IUserService userService;

    @Autowired
    IBookingService bookingService;

    @Autowired
    IShowService showService;

    @GetMapping(value="getRazorpayOrderId/{id}")
    public BookingDTO getRazorId(@PathVariable("id") String id)
    {
        return bookingService.getRazorpayOrderId(id);
    }

    @PostMapping(value="addBooking")
    public ResponseEntity<?> create(@RequestBody BookingRequestDTO request) throws Exception {
        double total = request.getTotalAmount();

        RazorpayClient client = new RazorpayClient(keyId, keySecret);
        JSONObject options = new JSONObject();
        options.put("amount", (int)(total * 100));
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        com.razorpay.Order razorOrder = client.orders.create(options);

        BookingDTO booking = new BookingDTO();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss");
        String formattedDate = booking.getCreatedAt().format(formatter);
        booking.setBookingDate(formattedDate);
        UserDTO user = userService.getUserById(request.getUserId());
        ShowDTO show = showService.getShowById(request.getShowId());
        booking.setUser(user);
        booking.setShow(show);
        booking.setRazorpayOrderId(razorOrder.get("id"));
        booking.setTotalAmount(total);
        booking.setStatus("Booked");
        booking.setSeatNumbers(request.getSeatNumbers());
        bookingService.addBooking(booking);

        return ResponseEntity.ok(booking);
    }

    @PostMapping(value="confirm")
    public PaymentDTO confirmPayment(@RequestBody ConfirmPaymentRequestDTO crequest) {
        System.out.println("razororderid "+crequest.getRazorpayOrderId());
        BookingDTO booking = bookingService.getRazorpayOrderId(crequest.getRazorpayOrderId());

        if (booking == null)
            return null;

        PaymentDTO payment = new PaymentDTO();
        payment.setBooking(booking);
        payment.setRazorpayPaymentId(crequest.getRazorpayPaymentId());
        payment.setAmount(booking.getTotalAmount());
        payment.setStatus("SUCCESS");

        booking.setStatus("PAID");
        bookingService.updateBooking(booking);
        paymentService.addPayment(payment);
        return payment;
    }

}
