import { FC, useContext } from "react";
import { Box, Media } from "../../../../components";
import { NavContext } from "./";
import { navImageWrapper, navImage } from "../Nav.styles";

const NavImages: FC<any> = ({ images, ...props }) => {
  const { defaultImage, imgProps, navSettings } = useContext(NavContext);
  const {
    imageSizes = "100vw",
    imageQuality = 80,
    imagePriority = true,
    disableImages = false,
  } = navSettings[0];

  if (disableImages) return null;

  const renderImages = images.map((image: any, i: number) => {
    const isActive = imgProps.image && imgProps.image.mediaId === image.mediaId;

    return (
      <Box key={`navImage${i}`} {...navImage(isActive)}>
        <Media
          key={`${image.mediaId} `}
          data={image}
          imageSizes={imageSizes}
          imageQuality={imageQuality}
          priority={imagePriority}
          usePhotographerAsCredit
        />
      </Box>
    );
  });

  return (
    <Box
      {...navImageWrapper(imgProps.imageAvail || imgProps.level === 2 ? 1 : 0)}
      {...props}
    >
      {renderImages}
      <Media
        data={defaultImage}
        imageSizes={imageSizes}
        imageQuality={imageQuality}
        priority={imagePriority}
        className="default"
        usePhotographerAsCredit
      />
    </Box>
  );
};

export default NavImages;
