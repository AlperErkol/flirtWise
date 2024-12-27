import { Cloudinary } from "@cloudinary/url-gen";
const CLOUD_NAME = "desmr2bkn";

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

export default cld;
