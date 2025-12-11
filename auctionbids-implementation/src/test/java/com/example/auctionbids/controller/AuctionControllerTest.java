package com.example.auctionbids.controller;

import com.example.auctionbids.entity.Auction;
import com.example.auctionbids.exception.AuctionNotFoundException;
import com.example.auctionbids.exception.MyFileNotFoundException;
import com.example.auctionbids.models.BidRequest;
import com.example.auctionbids.models.BidResponse;
import com.example.auctionbids.models.ErrorResponse;
import com.example.auctionbids.payload.UploadFileResponse;
import com.example.auctionbids.repository.AuctionRepository;
import com.example.auctionbids.repository.BidRepository;
import com.example.auctionbids.service.AuctionService;
import com.example.auctionbids.service.CustomUserDetailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class AuctionControllerTest {

    @Mock
    private AuctionService auctionService;

    @InjectMocks
    private AuctionController auctionController;

    @Mock
    private AuctionRepository auctionRepository;

    @Mock
    private CustomUserDetailService customUserDetailService;

    @Mock
    private BidRepository bidRepository;

//    @Autowired
    private MockMvc mockMvc;
    private Object IllegalArgumentException;


    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new AuctionController(auctionService)).build();

//        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateAuction() {
        Auction auction = new Auction(); // Create an Auction object to pass to the controller
        when(auctionService.createAuction(any(Auction.class))).thenReturn(auction);

        Auction result = auctionController.createAuction(auction);

        assertNotNull(result);
        assertEquals(auction, result);
    }

    @Test
    public void testGetAuctionByID() throws AuctionNotFoundException {
        Long auctionId = 1L;
        Auction auction = new Auction(); // Create an Auction object to return from the service
        when(auctionService.getAuctionByID(auctionId)).thenReturn(auction);

        Auction result = auctionController.getAuctionByID(auctionId);

        assertNotNull(result);
        assertEquals(auction, result);
    }

    @Test
    public void testUpdateAuction() throws AuctionNotFoundException {
        Long auctionId = 1L;
        Auction updatedAuction = new Auction(); // Create an updated Auction object to pass to the controller
        when(auctionService.updateAuction(eq(auctionId), any(Auction.class))).thenReturn(updatedAuction);

        Auction result = auctionController.updateAuction(auctionId, updatedAuction);

        assertNotNull(result);
        assertEquals(updatedAuction, result);
    }

    @Test
    public void testDeleteAuction() throws AuctionNotFoundException {
        Long auctionId = 1L;
        when(auctionService.deleteAuction(auctionId)).thenReturn(true);

        ResponseEntity<String> response = auctionController.deleteAuction(auctionId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    public void testDeleteAuctionNotFound() throws AuctionNotFoundException {
        Long auctionId = 1L;
        when(auctionService.deleteAuction(auctionId)).thenReturn(false);

        ResponseEntity<String> response = auctionController.deleteAuction(auctionId);

        assertNotNull(response);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void testUploadFile() {
        Long auctionId = 1L;
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file", "test.txt", MediaType.TEXT_PLAIN_VALUE, "File Content".getBytes());

        String fileName = "test.txt";
        String fileDownloadUri = "http://localhost/downloadFile/" + fileName; // Generate the download link dynamically
        String fileType = MediaType.TEXT_PLAIN_VALUE;
        long size = mockMultipartFile.getSize();

        UploadFileResponse expectedResponse = new UploadFileResponse(fileName, fileDownloadUri, fileType, size);
        when(auctionService.storeFile(any(MultipartFile.class), eq(auctionId))).thenReturn(fileName);

        // Create a mock HttpServletRequest and set it as the current request
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        UploadFileResponse response = auctionController.uploadFile(mockMultipartFile, auctionId);

        assertNotNull(response);
        assertEquals(expectedResponse.getFileName(), response.getFileName());
        assertEquals(expectedResponse.getFileDownloadUri(), response.getFileDownloadUri());
        assertEquals(expectedResponse.getFileType(), response.getFileType());
        assertEquals(expectedResponse.getSize(), response.getSize());
    }





    @Test
    public void testPlaceBid_Success() {
        Long auctionId = 1L;
        Long userId = 2L;
        Double newBidAmount = 150.0;

        BidRequest bidRequest = new BidRequest(newBidAmount);

        BidResponse expectedResponse = new BidResponse();
        expectedResponse.setMessage("Bid placed successfully");
        // Set other fields in the expectedResponse

        when(auctionService.placeBid(anyLong(), anyLong(), any(BidRequest.class)))
                .thenReturn(ResponseEntity.ok(expectedResponse));

        ResponseEntity<?> responseEntity = auctionController.placeBid(auctionId, userId, bidRequest);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        BidResponse actualResponse = (BidResponse) responseEntity.getBody();
        assertEquals(expectedResponse, actualResponse);

        verify(auctionService, times(1)).placeBid(auctionId, userId, bidRequest);
    }



    @Test
    public void testPlaceBid_AuctionNotFound() {
        Long auctionId = 1L;
        Long userId = 2L;
        Double newBidAmount = 150.0;

        BidRequest bidRequest = new BidRequest(newBidAmount);

        when(auctionService.placeBid(eq(auctionId), eq(userId), any(BidRequest.class)))
                .thenThrow(new AuctionNotFoundException("Auction with ID " + auctionId + " not found"));

        // Perform the test (expecting AuctionNotFoundException)
        assertThrows(AuctionNotFoundException.class,
                () -> auctionController.placeBid(auctionId, userId, bidRequest));
    }

    @Test
    public void testPlaceBid_UserNotFound() {
        Long auctionId = 1L;
        Long userId = 2L;
        Double newBidAmount = 150.0;

        BidRequest bidRequest = new BidRequest(newBidAmount);

        when(auctionService.placeBid(eq(auctionId), eq(userId), any(BidRequest.class)))
                .thenThrow(new MyFileNotFoundException("User with ID " + userId + " not found"));

        // Perform the test (expecting MyFileNotFoundException)
        assertThrows(MyFileNotFoundException.class,
                () -> auctionController.placeBid(auctionId, userId, bidRequest));
    }

    @Test
    public void testPlaceBid_AuctionEnded() {
        Long auctionId = 2L;
        Long userId = 2L;
        Double newBidAmount = 150.0;

        BidRequest bidRequest = new BidRequest(newBidAmount);

        when(auctionService.placeBid(eq(auctionId), eq(userId), any(BidRequest.class)))
                .thenThrow(new IllegalArgumentException("Cannot place a bid on a closed auction"));

        // Perform the test (expecting IllegalArgumentException)
        assertThrows(IllegalArgumentException.class,
                () -> auctionController.placeBid(auctionId, userId, bidRequest));
    }


    @Test
    public void testPlaceBid_InvalidBidAmount() {
        Long auctionId = 1L;
        Long userId = 2L;
        Double newBidAmount = 50.0;

        BidRequest bidRequest = new BidRequest(newBidAmount);

        when(auctionService.placeBid(eq(auctionId), eq(userId), any(BidRequest.class)))
                .thenThrow(new IllegalArgumentException("Current Bid Amount Should be greater than LastBidAmount"));

        // Perform the test (expecting IllegalArgumentException)
        assertThrows(IllegalArgumentException.class,
                () -> auctionController.placeBid(auctionId, userId, bidRequest));
    }

}




