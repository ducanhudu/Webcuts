package com.cutie_cuts_app.example.cutie_cuts_app.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnExpression(
        "'${app.mail.provider:console}'.trim().isEmpty() || "
                + "'${app.mail.provider:console}'.equalsIgnoreCase('console')")
public class ConsoleEmailService implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(ConsoleEmailService.class);

    @Override
    public void sendPasswordResetOtp(String toEmail, String otp) {
        log.info("Password reset OTP generated for {}", toEmail);
        log.debug("Password reset OTP: {}", otp);
    }

    @Override
    public void sendRegistrationOtp(String toEmail, String otp) {
        log.info("Registration OTP generated for {}", toEmail);
        log.debug("Registration OTP: {}", otp);
    }
}
