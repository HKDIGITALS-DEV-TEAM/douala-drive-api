export const swaggerSchemas = {
  UserDTO: {
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string" },
      name: { type: "string" },
      phone: { type: "string" },
      fidelity_points: { type: "numeric" },
      role: { type: "string" },
      profilePicture: { type: "string" },
      createdAt: { type: "date" },
      updatedAt: { type: "date" },
      deleteAt: { type: "date" },
    },
  },
  ConfigurationDTO: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      address: { type: "string" },
      phone: { type: "string" },
      email: { type: "string" },
      openingHours: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            label: { type: "string" },
          },
        },
      },
      rates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            icon: { type: "string" },
            excerpt: { type: "string" },
            price: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
  },
  ConfigurationRequest: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      address: { type: "string" },
      phone: { type: "string" },
      email: { type: "string" },
      openingHours: {
        type: "array",
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
          },
        },
      },
      rates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            icon: { type: "string" },
            excerpt: { type: "string" },
            price: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
  },
  VehicleDTO: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      brand: { type: "string" },
      category: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
      color: { type: "string" },
      image: { type: "string" },
      price: { type: "numeric" },
      status: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
      features: { type: "string" },
      description: { type: "string" },
      createdAt: { type: "date" },
      updatedAt: { type: "date" },
      deleteAt: { type: "date" },
    },
  },
  VehicleRequest: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      category_id: { type: "string" },
      color: { type: "string" },
      image: { type: "string" },
      price: { type: "numeric" },
      status_id: { type: "string" },
      features: { type: "string" },
      description: { type: "string" },
    },
  },
  ArticleDTO: {
    type: "object",
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      slug: { type: "string" },
      category: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
      image: { type: "string" },
      excerpt: { type: "numeric" },
      status: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
      content: { type: "string" },
      author: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
        },
      },
      tags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
          },
        },
      },
      createdAt: { type: "date" },
      updatedAt: { type: "date" },
    },
  },
  EditProfileRequest: {
    type: "object",
    properties: {
      name: { type: "string" },
      phone: { type: "string" },
      fidelity_points: { type: "numeric" },
    },
  },
};
