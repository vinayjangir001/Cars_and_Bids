package com.example.auctionbids.controller;

import com.example.auctionbids.entity.Auction;
import com.example.auctionbids.entity.Bid;
import com.example.auctionbids.exception.AuctionNotFoundException;
import com.example.auctionbids.models.BidRequest;
import com.example.auctionbids.models.BidResponse;
import com.example.auctionbids.models.ErrorResponse;
import com.example.auctionbids.payload.UploadFileResponse;
import com.example.auctionbids.service.AuctionService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class AuctionController {

    private static final Logger logger = LoggerFactory.getLogger(AuctionController.class);

    @Autowired
    private final AuctionService auctionService;


    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    @PostMapping("/createAuction")
    public Auction createAuction(@RequestBody Auction auction) {
        return auctionService.createAuction(auction);
    }

    @GetMapping("/auctionByID/{auctionId}")
    public Auction getAuctionByID(@PathVariable Long auctionId) throws AuctionNotFoundException {
        return auctionService.getAuctionByID(auctionId);
    }

    @GetMapping("/auction/all")
    public List<Auction> getAllAuction() throws AuctionNotFoundException {
        return auctionService.getAllAuction();
    }


    @PutMapping("/updateAuction/{auctionId}")
    public Auction updateAuction(@PathVariable Long auctionId, @RequestBody Auction updatedAuction) throws AuctionNotFoundException {
        return auctionService.updateAuction(auctionId, updatedAuction);
    }

    @DeleteMapping("/deleteAuction/{auctionId}")
    public ResponseEntity<String> deleteAuction(@PathVariable Long auctionId) throws AuctionNotFoundException {
        boolean deleted = auctionService.deleteAuction(auctionId);
        if (deleted) {
            return ResponseEntity.ok("Auction with ID " + auctionId + " has been deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }




    @PostMapping("/uploadFile/{auctionID}")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file,@PathVariable Long auctionID) {
        String fileName = auctionService.storeFile(file,auctionID);



        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles/{auctionID}")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,@PathVariable Long auctionID) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file,auctionID))
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = auctionService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }


    @PostMapping("/auction/{auctionId}/user/{userId}/bid")
    public ResponseEntity<?> placeBid(
            @PathVariable Long auctionId,
            @PathVariable Long userId,
            @RequestBody BidRequest bidRequest
    )  {
        ResponseEntity<?> response = auctionService.placeBid(auctionId, userId, bidRequest);

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());

    }


}







