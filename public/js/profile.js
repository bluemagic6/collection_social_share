let pictureData = {};

cloudinary.applyUploadWidget(
  document.querySelector(".wiget"),
  { cloudName: "jgold", uploadPreset: "wbzmtfqf", sources: ["local"], multiple: false },
  (error, result) => {
    if (result.event === "success") {
      pictureData = result.info;
    }
  }
);

const newItemHandler = async (event) => {
  event.preventDefault();

  const item_name = document.querySelector("#item-name").value.trim();
  const item_description = document.querySelector("#item-desc").value.trim();
  const collection_id = document.querySelector("#col-id").value;

  if (item_name && item_description) {
    const response = await fetch(`/api/item`, {
      method: "POST",
      body: JSON.stringify({ item_name, item_description, collection_id, item_image: pictureData.secure_url }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create item");
    }
  }
};

const delItemButtonHandler = async (event) => {
  if (event.target.hasAttribute("item-data-id")) {
    const id = event.target.getAttribute("item-data-id");

    const response = await fetch(`/api/item/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

const newFormHandler = async (event) => {
  event.preventDefault();

  const col_name = document.querySelector("#col-name").value.trim();
  const col_description = document.querySelector("#col-desc").value.trim();

  if (col_name && col_description) {
    const response = await fetch(`/api/collection`, {
      method: "POST",
      body: JSON.stringify({ col_name, col_description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create item");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/collection/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document.querySelector(".new-collection-form").addEventListener("submit", newFormHandler);

document.querySelector(".collection-list").addEventListener("click", delButtonHandler);

document.querySelector(".new-item-form").addEventListener("submit", newItemHandler);

document.querySelector(".item-list").addEventListener("click", delItemButtonHandler);
