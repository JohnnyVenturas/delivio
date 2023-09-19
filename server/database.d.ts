export interface OrderEntryII {
		orderId : string;
		orderContents: {
			price: string;
			quantity: string;
			productId: string;
		};
		orderClientInfo: {
			address: string;
			country: string;
			phoneNumber: string;
			email: string;
			firstname?: string;
			lastname?: string;
			companyName?: string;
			companyVat?: string;
		};
}

export interface ClientEntryII {
	email : string;
	password_hash : {}
	orders : OrderII 
}

export interface OrderII {
  orderId: string;
  customerType: "business" | "client";
  orderDetails: {
    deliveryDetails: {
      country: string;
      county: string;
      adress: string;
      postalCode: string;
      phoneNumber: string;
      deliveryType?: string;
      deliveryPrice?: number;
    };

    clientDetails?: {
      clientLastName: string;
      clientFirstName: string;
      clientSalutation: string;
      email: string;
    };

    companyDetails?: {
      companyType: string;
      companyName: string;
      vatIdentificationNumber: string;
      vatRegistrationNumber: string;
    };

    orderProductDetails: {
      [productId: string]: {
        quantity: number;
        price: number;
        productID: string;
        description: string;
      };
    };
    orderTotal: number;
  };

  billingDetails: {
    email: string;
    address: {
      country: string;
      county: string;
      adress: string;
      postalCode: string;
      phoneNumber: string;
    };

    clientDetails?: {
      clientLastName: string;
      clientFirstName: string;
      clientSalutation: string;
    };

    companyDetails?: {
      companyType: string;
      companyName: string;
      vatIdentificationNumber: string;
      vatRegistrationNumber: string;
    };

    orderProductDetails: {
      [productId: string]: {
        quantity: number;
        price: number;
        productID: string;
        description: string;
      };
    };
  };
}
