import React, { useState, useCallback } from "react";
import "./App.css";
import {
  Box,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BiHappyHeartEyes, BiSad } from "react-icons/bi";
import ImageViewer from "react-simple-image-viewer";

function ImageComponent(props) {
  const { imageSrc } = props;
  const { imageSrc1 } = props;
  // const { selectedObjects } = props;
  const [feedback, setFeedback] = useState(null);

  // const [currentImage, setCurrentImage] = useState(imageSrc);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { videoUrl } = props;
  const { isChecked } = props;
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
  const toast = useToast();
  function iconHandlerHappy() {
    setFeedback("liked");
    toast({
      title: "Great to see you liked!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  function iconHandlerSad() {
    setFeedback("disliked");
    toast({
      title: "Sorry to hear you didn't like!",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <>
      <div className="media-container">
        {isChecked && (
          <>
            {imageSrc && (
              <Flex
                gap="4"
                direction={{ base: "column", md: "column", lg: "row" }}
              >
                <Card maxW="sm" className="mt-5">
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Box>
                          <Heading size="md">Original image</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <div className="hover0">
                    <Image
                      // objectFit="contain"
                      onClick={openImageViewer}
                      loading="eager"
                      src={imageSrc1}
                      alt="Chakra UI"
                    />
                    {isViewerOpen && (
                      <ImageViewer
                        src={imageSrc}
                        onClose={closeImageViewer}
                        disableScroll={false}
                        backgroundStyle={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                        }}
                        closeOnClickOutside={true}
                      />
                    )}
                  </div>

                  <CardFooter
                    justify="center"
                    flexWrap="wrap"
                    gap="20px"
                    sx={{
                      "& > button": {
                        minW: "50px",
                      },
                    }}
                  ></CardFooter>
                </Card>
                <Card maxW="sm" className="mt-5">
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Box>
                          <Heading size="md">Labeled image</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <div className="hover1">
                    <Image
                      // objectFit="contain"
                      loading="eager"
                      src={imageSrc}
                      alt="Chakra UI"
                    />
                  </div>
                  <CardFooter
                    justify="center"
                    flexWrap="wrap"
                    gap="20px"
                    sx={{
                      "& > button": {
                        minW: "50px",
                      },
                    }}
                  >
                    <VStack>
                      <Flex justify="center" flexWrap="wrap" gap="20px">
                        {/* {props.options.map((obj, index) => {
                          <Badge colorScheme="green" key={index}>
                            {obj.value}
                          </Badge>;
                        })} */}
                        {/* <Badge colorScheme="green">Person</Badge>
                        <Badge colorScheme="green">Chair</Badge>
                        <Badge colorScheme="green">Taable</Badge> */}
                      </Flex>

                      <div>
                        {feedback === null ? (
                          <>
                            <Text>Rate this result: </Text>
                            <Flex justify="center" flexWrap="wrap" gap="20px">
                              <Box>
                                <BiHappyHeartEyes
                                  fontSize={"22px"}
                                  onClick={iconHandlerHappy}
                                  cursor={"pointer"}
                                />
                              </Box>
                              <Box>
                                <BiSad
                                  fontSize={"22px"}
                                  onClick={iconHandlerSad}
                                  cursor={"pointer"}
                                />
                              </Box>
                            </Flex>
                          </>
                        ) : (
                          <Text>Thanks for your feedback!</Text>
                        )}
                      </div>
                    </VStack>
                  </CardFooter>
                </Card>
              </Flex>
            )}

            {/* videoc code */}

            {videoUrl && (
              <Flex
                gap="4"
                direction={{ base: "column", md: "column", lg: "row" }}
              >
                <Card maxW="sm" className="mt-5">
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Box>
                          <Heading size="md">Original video</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <div className="hover0">
                    <video
                      controls
                      // objectFit="contain"
                      onClick={openImageViewer}
                      loading="eager"
                      src={videoUrl}
                      alt="Chakra UI"
                    />
                    {isViewerOpen && (
                      <ImageViewer
                        src={videoUrl}
                        onClose={closeImageViewer}
                        disableScroll={false}
                        backgroundStyle={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                        }}
                        closeOnClickOutside={true}
                      />
                    )}
                  </div>

                  <CardFooter
                    justify="center"
                    flexWrap="wrap"
                    gap="20px"
                    sx={{
                      "& > button": {
                        minW: "50px",
                      },
                    }}
                  ></CardFooter>
                </Card>
                <Card maxW="sm" className="mt-5">
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Box>
                          <Heading size="md">Labeled video</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <div className="hover1">
                    <video
                      controls
                      // objectFit="contain"
                      loading="eager"
                      src={videoUrl}
                      alt="Chakra UI"
                    />
                  </div>
                  <CardFooter
                    justify="center"
                    flexWrap="wrap"
                    gap="20px"
                    sx={{
                      "& > button": {
                        minW: "50px",
                      },
                    }}
                  >
                    <VStack>
                      <Flex justify="center" flexWrap="wrap" gap="20px">
                        {/* {props.options.map((obj, index) => {
                          <Badge colorScheme="green" key={index}>
                            {obj.value}
                          </Badge>;
                        })} */}
                        {/* <Badge colorScheme="green">Person</Badge>
                        <Badge colorScheme="green">Chair</Badge>
                        <Badge colorScheme="green">Taable</Badge> */}
                      </Flex>

                      <div>
                        {feedback === null ? (
                          <>
                            <Text>Rate this result: </Text>
                            <Flex justify="center" flexWrap="wrap" gap="20px">
                              <Box>
                                <BiHappyHeartEyes
                                  fontSize={"22px"}
                                  onClick={iconHandlerHappy}
                                  cursor={"pointer"}
                                />
                              </Box>
                              <Box>
                                <BiSad
                                  fontSize={"22px"}
                                  onClick={iconHandlerSad}
                                  cursor={"pointer"}
                                />
                              </Box>
                            </Flex>
                          </>
                        ) : (
                          <Text>Thanks for your feedback!</Text>
                        )}
                      </div>
                    </VStack>
                  </CardFooter>
                </Card>
              </Flex>
            )}
          </>
        )}
      </div>
      <div className="media-container">
        {!isChecked && (
          <>
            {/* videoc code */}

            {videoUrl && (
              <Flex
                gap="4"
                direction={{ base: "column", md: "column", lg: "row" }}
              >
                <Card maxW="sm" className="mt-5">
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Box>
                          <Heading size="md">Original video</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <div className="hover0">
                    <video
                      controls
                      // objectFit="contain"
                      onClick={openImageViewer}
                      loading="eager"
                      src={videoUrl}
                      alt="Chakra UI"
                    />
                    {isViewerOpen && (
                      <ImageViewer
                        src={videoUrl}
                        onClose={closeImageViewer}
                        disableScroll={false}
                        backgroundStyle={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                        }}
                        closeOnClickOutside={true}
                      />
                    )}
                  </div>

                  <CardFooter
                    justify="center"
                    flexWrap="wrap"
                    gap="20px"
                    sx={{
                      "& > button": {
                        minW: "50px",
                      },
                    }}
                  ></CardFooter>
                </Card>
                <Card maxW="sm" className="mt-5">
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Box>
                          <Heading size="md">Labeled video</Heading>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <div className="hover1">
                    <video
                      controls
                      // objectFit="contain"
                      loading="eager"
                      src={videoUrl}
                      alt="Chakra UI"
                    />
                  </div>
                  <CardFooter
                    justify="center"
                    flexWrap="wrap"
                    gap="20px"
                    sx={{
                      "& > button": {
                        minW: "50px",
                      },
                    }}
                  >
                    <VStack>
                      <Flex justify="center" flexWrap="wrap" gap="20px">
                        {/* {props.options.map((obj, index) => {
                          <Badge colorScheme="green" key={index}>
                            {obj.value}
                          </Badge>;
                        })} */}
                        {/* <Badge colorScheme="green">Person</Badge>
                        <Badge colorScheme="green">Chair</Badge>
                        <Badge colorScheme="green">Taable</Badge> */}
                      </Flex>

                      <div>
                        {feedback === null ? (
                          <>
                            <Text>Rate this result: </Text>
                            <Flex justify="center" flexWrap="wrap" gap="20px">
                              <Box>
                                <BiHappyHeartEyes
                                  fontSize={"22px"}
                                  onClick={iconHandlerHappy}
                                  cursor={"pointer"}
                                />
                              </Box>
                              <Box>
                                <BiSad
                                  fontSize={"22px"}
                                  onClick={iconHandlerSad}
                                  cursor={"pointer"}
                                />
                              </Box>
                            </Flex>
                          </>
                        ) : (
                          <Text>Thanks for your feedback!</Text>
                        )}
                      </div>
                    </VStack>
                  </CardFooter>
                </Card>
              </Flex>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ImageComponent;
