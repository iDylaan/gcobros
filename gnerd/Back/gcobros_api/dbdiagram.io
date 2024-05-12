Table products {
  id UUID [pk]
  productName STRING
  skuId STRING
  skuName STRING
  monthlyPrice DOUBLE [default: NULL]
  yearlyPrice DOUBLE [default: NULL]
  fixedPlan DOUBLE [default: false]
}

Table subscriptions {
  id UUID [pk]
  customerId STRING
  subscriptionId STRING
  skuId STRING
  creationTime STRING
  kind STRING
  seats_kind STRING
  seats_numberOfSeats INTEGER
  seats_maximumNumberOfSeats INTEGER
  seats_licensedNumberOfSeats INTEGER
  totalToPay DOUBLE
  alreadyPay BOOLEAN
  renewalSettings_kind STRING
  renewalSettings_renewalType STRING
  purchaseOrderId STRING
  status STRING
  resourceUiUrl STRING
  billingMethod STRING
  customerDomain STRING
  dealCode STRING
  skuName STRING
  plan_planName STRING
  plan_isCommitmentPlan BOOLEAN
  plan_commitmentInterval_startTime STRING
  plan_commitmentInterval_endTime STRING
  trialSettings_isInTrial STRING
  trialSettings_trialEndTime STRING
  transferInfo_transferabilityExpirationTime STRING
  transferInfo_minimumTransferableSeats INTEGER
  transferInfo_currentLegacySkuId STRING
}

Table transactions {
  id UUID [pk]
  domain STRING
  chargeId STRING
  amount INTEGER
  amount_captured INTEGER
  amount_refunded INTEGER
  balance_transaction STRING
  description STRING
  paid BOOLEAN
  payment_method STRING
  receipt_email STRING
  refunded BOOLEAN
  created STRING
  merchant_amount INTEGER
  merchant_currency STRING
  reference STRING
  firstDate STRING
  lastDate STRING
  currency STRING
  status STRING
}

Table customers {
  id UUID [pk]
  customerId STRING
  customerDomain STRING
  customerName STRING
  organizationName STRING
  active BOOLEAN
}

Ref: "products"."skuId" < "subscriptions"."skuId"

Ref: "subscriptions"."customerDomain" < "transactions"."domain"

Ref: "customers"."customerDomain" < "transactions"."domain"

Ref: "customers"."customerDomain" < "subscriptions"."customerDomain"