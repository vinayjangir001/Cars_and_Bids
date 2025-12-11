package com.example.auctionbids;

import com.example.auctionbids.config.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({FileStorageProperties.class})
public class AuctionbidsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuctionbidsApplication.class, args);
	}

}
