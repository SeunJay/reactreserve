import React, { useState } from "react";

import {
  Form,
  Input,
  Header,
  TextArea,
  Button,
  Image,
  Message,
  Icon
} from "semantic-ui-react";

import axios from "axios";
import baseUrl from "../utils/baseUrl";

function CreateProduct() {
  const initialProduct = {
    name: "",
    price: "",
    media: "",
    description: ""
  };

  const [product, setProduct] = useState(initialProduct);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mediaReview, setMediaPreview] = useState("");

  const handleMediaUpload = async () => {
    const data = new FormData();
    data.append("file", product.media);
    data.append("upload_preset", "ecommerce");
    data.append("cloud_name", "seunjay");
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const mediaUrl = await handleMediaUpload();
    console.log({ mediaUrl });

    const url = `${baseUrl}/api/product`;
    const { name, price, description } = product;
    const payload = { name, price, description, mediaUrl };
    const response = await axios.post(url, payload);
    console.log(response.data);
    setLoading(false);
    setProduct(initialProduct);
    setSuccess(true);
  };

  const handleChange = e => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const { name, price, description } = product;

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Product created successfully"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0"
            step="1"
            type="number"
            value={price}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="media"
            label="Media"
            type="file"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaReview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
        />

        <Form.Field
          control={Button}
          disabled={loading}
          color="blue"
          icon="pencil alternate"
          content="submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
