
USD_TO_INR_RATE = 83.0  # Approximate conversion rate, you might want to update this for real-time rates

def convert_usd_to_inr(usd_amount):
    return usd_amount * USD_TO_INR_RATE

# Example watch prices in USD
watch_prices_usd = {
    "Rolex Submariner": 10000,
    "Omega Seamaster": 5000,
    "Casio G-Shock": 150,
    "Apple Watch Ultra": 800
}

print("Watch Prices (USD to INR Conversion):")
for watch, price_usd in watch_prices_usd.items():
    price_inr = convert_usd_to_inr(price_usd)
    print(f"{watch}: ${price_usd:.2f} USD = ₹{price_inr:.2f} INR")








