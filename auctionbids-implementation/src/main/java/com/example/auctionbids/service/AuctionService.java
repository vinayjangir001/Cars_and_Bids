package com.example.auctionbids.service;

import com.example.auctionbids.config.FileStorageProperties;
import com.example.auctionbids.entity.Auction;
import com.example.auctionbids.entity.Bid;
import com.example.auctionbids.entity.User;
import com.example.auctionbids.enums.AuctionStatus;
import com.example.auctionbids.exception.AuctionNotFoundException;
import com.example.auctionbids.exception.FileStorageException;
import com.example.auctionbids.exception.MyFileNotFoundException;
import com.example.auctionbids.models.BidRequest;
import com.example.auctionbids.models.BidResponse;
import com.example.auctionbids.models.ErrorResponse;
import com.example.auctionbids.repository.AuctionRepository;
import com.example.auctionbids.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartFile;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AuctionService {

    @Autowired
    private  AuctionRepository auctionRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private CustomUserDetailService customUserDetailService;

//    private Map<Long, List<String>> auctionImagesMap = new HashMap<>();

    private final Path fileStorageLocation;

    @Autowired
    public AuctionService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, Long auctionID) {
        // Normalize file name
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

        Auction auction = auctionRepository.findById(auctionID)
                .orElseThrow(() -> new MyFileNotFoundException("Auction ID is Not Found"));

        try {
            // Check if the file's name contains invalid characters
            if (originalFileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + originalFileName);
            }

            // Generate a unique file name using the current timestamp and a random string
            String uniqueFileName = generateUniqueFileName(originalFileName);

            if (auction.getCarImages() == null) {
                Set<String> imageSet = new HashSet<>();
                imageSet.add(uniqueFileName);
                auction.setCarImages(imageSet);
            } else {
                auction.getCarImages().add(uniqueFileName);
            }

            auctionRepository.save(auction);

            // Copy file to the target location with the unique name
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);


            System.out.println(uniqueFileName);
            System.out.println(originalFileName);
            return uniqueFileName;


        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }

    private String generateUniqueFileName(String originalFileName) {
        // Get the current timestamp
        LocalDateTime currentTime = LocalDateTime.now();

        // Format the timestamp as a string (you can customize the format as per your preference)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
        String formattedTimestamp = currentTime.format(formatter);

        // Generate a random alphanumeric string to make the file name unique
        String randomString = RandomStringUtils.randomAlphanumeric(8);

        // Extract the file extension (if any) from the original file name
        String fileExtension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFileName.substring(dotIndex);
        }

        // Combine the formatted timestamp, random string, and the file extension to create the unique file name
        String uniqueFileName = formattedTimestamp + randomString + fileExtension;

        return uniqueFileName;
    }

    // Method to get the list of image file names for a specific auction ID
//    public List<String> getImagesForAuction(Long auctionId) {
//        return auctionImagesMap.getOrDefault(auctionId, new ArrayList<>());
//    }


    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }


    public Auction createAuction(Auction auction) {


        auction.setAuctionStatus(AuctionStatus.CREATED);
        LocalDateTime now = LocalDateTime.now();
        auction.setStartTime(now);
        LocalDateTime endTime = now.plusDays(2); // Adding 2 days to the current time
        auction.setEndTime(endTime);
        auctionRepository.save(auction);
        return auction;
    }


    public Auction getAuctionByID(Long auctionId) throws AuctionNotFoundException {

        Auction getAuctionByID = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new AuctionNotFoundException("Auction with ID " + auctionId + " not found"));


        return getAuctionByID; // Auction with the given ID not found.
    }


    public List<Auction> getAllAuction() throws AuctionNotFoundException {

        return auctionRepository.findAll();
    }


    public Auction updateAuction(Long auctionId, Auction updatedAuction) throws AuctionNotFoundException {
        Auction existingAuction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new AuctionNotFoundException("Auction with ID " + auctionId + " not found"));

        existingAuction.setUser(updatedAuction.getUser());
        existingAuction.setCar(updatedAuction.getCar());
        existingAuction.setStartTime(updatedAuction.getStartTime());
        existingAuction.setEndTime(updatedAuction.getEndTime());
        existingAuction.setAuctionStatus(updatedAuction.getAuctionStatus());
        existingAuction.setCarImages(updatedAuction.getCarImages());

        existingAuction = auctionRepository.save(existingAuction);
        return existingAuction;
    }


    public boolean deleteAuction(Long auctionId) throws AuctionNotFoundException {
        Auction existingAuction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new AuctionNotFoundException("Auction with ID " + auctionId + " not found"));


        auctionRepository.delete(existingAuction);
        return true;
    }

    public ResponseEntity placeBid(Long auctionId, Long userId, BidRequest bidRequest) {
        try {
            Auction auction = auctionRepository.findById(auctionId)
                    .orElseThrow(() -> new AuctionNotFoundException("Auction with ID " + auctionId + " not found"));

            User user = customUserDetailService.getUserById(userId);
            if (user == null) {
                throw new MyFileNotFoundException("User with ID " + userId + " not found");
            }

            if (auction.getAuctionStatus() == AuctionStatus.ENDED) {
                throw new IllegalArgumentException("Cannot place a bid on a closed auction");
            }

            if (bidRequest.getAmount() <= auction.getLastBidAmount()) {
                throw new IllegalArgumentException("Current Bid Amount Should be greater than LastBidAmount");
            }

            // Check if this is the first bid for the auction
            boolean isFirstBid = auction.getTotalBids() == 0;

            // Fetch the last bid details from the database if it's not the first bid
            double lastBidAmount;
            int totalBids;
            Date bidTime = new Date(); // Assuming the bid time should be the current time for each new bid

            if (!isFirstBid) {
                lastBidAmount = auction.getLastBidAmount();
                totalBids = auction.getTotalBids() + 1;
            } else {
                // For the first bid, use the bid amount as the initial last bid amount
                lastBidAmount = bidRequest.getAmount();
                totalBids = 1;
            }

            Bid bid = new Bid();
            bid.setAuction(auction);
            bid.setUser(user);
            bid.setAmount(bidRequest.getAmount());
            bid.setBidTime(LocalDateTime.now());
            bid.setTotalBids(totalBids);
            bid.setLastBidAmount(lastBidAmount);

            // Save the bid to the database
            Bid savedBid = bidRepository.save(bid);

            // Update auction details directly without saving the entire Bid entity in the Auction
            auction.setTotalBids(totalBids);

            if (isFirstBid) {
                // For the first bid, use the bid amount as the initial last bid amount
                auction.setLastBidAmount(bidRequest.getAmount());
            } else {
                // For subsequent bids, update the last bid amount with the current bid amount
                auction.setLastBidAmount(savedBid.getAmount());
            }

            // Save the updated auction details to the database
            auctionRepository.save(auction);

            BidResponse responseDTO = new BidResponse();
            responseDTO.setMessage("Bid placed successfully");
            // Populate responseDTO with relevant bid information
            responseDTO.setAuctionId(savedBid.getAuction().getAuctionId());
            responseDTO.setUserId(savedBid.getUser().getId());
            responseDTO.setAmount(savedBid.getAmount());
            responseDTO.setLastBidAmount(savedBid.getLastBidAmount());
            responseDTO.setBidTime(savedBid.getBidTime());
            responseDTO.setTotalBids(savedBid.getTotalBids());
            // Add any other relevant details to the response DTO

            return ResponseEntity.ok(responseDTO);

        } catch (AuctionNotFoundException ex) {
            // Handle AuctionNotFoundException
            // Create an error response for not found exception
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
            errorResponse.setError("Auction Not Found");
            errorResponse.setMessage(ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (IllegalArgumentException ex) {
            // Handle IllegalArgumentException
            // Create an error response for bad request exception
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
            errorResponse.setError("Bad Request");
            errorResponse.setMessage(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception ex) {
            // Handle other unexpected exceptions
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            errorResponse.setError("Internal Server Error");
            errorResponse.setMessage("An unexpected error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }



}
