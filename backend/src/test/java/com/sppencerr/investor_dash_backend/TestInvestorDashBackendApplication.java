package com.sppencerr.investor_dash_backend;

import org.springframework.boot.SpringApplication;

public class TestInvestorDashBackendApplication {

	public static void main(String[] args) {
		SpringApplication.from(InvestorDashBackendApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
