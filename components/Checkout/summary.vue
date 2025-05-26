<script setup>
import { useCartStore } from '@/stores/cart'
import { ref, computed } from 'vue'

const cart = useCartStore()
const selectedMethod = ref('card')
const isProcessing = ref(false)
const paymentDone = ref(false)
const receiptData = ref(null)
const errorMessage = ref('')
const cardNumber = ref('')
const cardName = ref('')
const expiryMonth = ref('')
const expiryYear = ref('')
const cvv = ref('')
const paypalEmail = ref('')
const bankAccount = ref('')
const bankName = ref('')
const bankType = ref('current')
const cryptoWallet = ref('')
const cryptoType = ref('bitcoin')
const upiId = ref('')

function validatePaymentForm() {
  errorMessage.value = ''

  if (selectedMethod.value === 'card') {
    if (!cardNumber.value || !cardName.value || !expiryMonth.value || !expiryYear.value || !cvv.value) {
      errorMessage.value = 'Please fill out all card details.'
      return false
    }
    if (!/^\d{16}$/.test(cardNumber.value.replace(/\s/g, ''))) {
      errorMessage.value = 'Card number must be 16 digits.'
      return false
    }
    if (!/^\d{3,4}$/.test(cvv.value)) {
      errorMessage.value = 'CVV must be 3 or 4 digits.'
      return false
    }
    if (!/^\d{2}$/.test(expiryMonth.value) || parseInt(expiryMonth.value) > 12 || parseInt(expiryMonth.value) < 1) {
      errorMessage.value = 'Please enter a valid month (01-12).'
      return false
    }
    if (!/^\d{2}$/.test(expiryYear.value)) {
      errorMessage.value = 'Please enter a valid 2-digit year.'
      return false
    }
  }

  if (selectedMethod.value === 'paypal') {
    if (!paypalEmail.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail.value)) {
      errorMessage.value = 'Please enter a valid PayPal email.'
      return false
    }
  }

  if (selectedMethod.value === 'bank') {
    if (!bankAccount.value || !bankName.value) {
      errorMessage.value = 'Please provide all bank details.'
      return false
    }
    
  }

  if (selectedMethod.value === 'crypto') {
    if (!cryptoWallet.value) {
      errorMessage.value = 'Please enter your crypto wallet address.'
      return false
    }
  
    if (cryptoType.value === 'bitcoin' && !/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(cryptoWallet.value)) {
      errorMessage.value = 'Please enter a valid Bitcoin address.'
      return false
    }
    if (cryptoType.value === 'ethereum' && !/^0x[a-fA-F0-9]{40}$/.test(cryptoWallet.value)) {
      errorMessage.value = 'Please enter a valid Ethereum address.'
      return false
    }
  }

  if (selectedMethod.value === 'upi') {
    if (!upiId.value || !/^[\w.-]+@[\w]+$/.test(upiId.value)) {
      errorMessage.value = 'Please enter a valid UPI ID (e.g., name@bank).'
      return false
    }
  }

  return true
}


const formatCardNumber = () => {
  if (selectedMethod.value === 'card') {
    const v = cardNumber.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      cardNumber.value = parts.join(' ')
    }
  }
}


const isPayDisabled = computed(() => {
  if (cart.items.length === 0) return true
  return !validatePaymentForm()
})

function handlePayment() {
  if (cart.items.length === 0) return
  if (!validatePaymentForm()) return

  isProcessing.value = true

  setTimeout(() => {
    receiptData.value = {
      id: Math.floor(Math.random() * 1000000),
      date: new Date().toISOString(),
      method: selectedMethod.value,
      items: [...cart.items],
      total: cart.total,
    }
    cart.clearCart()
    isProcessing.value = false
    paymentDone.value = true
  }, 2000)
}

const downloadPDF = async () => {
  try {
    
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('receipt')
    const opt = {
      margin: 10,
      filename: `Nuxt_Store_Receipt_${receiptData.value.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please try again or use the print option.')
  }
}

const printReceipt = () => {
  const receiptElement = document.getElementById('receipt')
  if (!receiptElement) return

  const printContent = receiptElement.cloneNode(true)
 
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <html>
      <head>
        <title>Receipt #${receiptData.value.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .receipt-container { max-width: 600px; margin: 0 auto; }
          .logo { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
          .logo img { width: 50px; height: 50px; }
          .logo-text h2 { margin: 0; color: #059669; }
          .logo-text p { margin: 0; font-size: 14px; color: #6b7280; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
          .divider { border-top: 1px solid #e5e7eb; margin: 15px 0; }
          .order-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
          .total { font-weight: bold; font-size: 18px; }
          @media print {
            body { padding: 0; }
            button { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          ${printContent.innerHTML}
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 200);
          }
        <\/script>
      </body>
    </html>
  `)
  printWindow.document.close()
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-10 font-sans">
    <h1 class="text-3xl font-bold mb-6">Checkout</h1>

    <div v-if="isProcessing" class="flex flex-col items-center justify-center h-64 text-center">
      <svg class="animate-spin h-10 w-10 text-green-600 mb-4" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <p class="text-gray-600 text-lg">Processing your payment...</p>
    </div>

    
    <div v-else-if="paymentDone && receiptData" class="text-center space-y-8">
      <div class="text-green-600 text-3xl font-bold animate-pulse"> Thank You for Your Purchase!</div>

      <div id="receipt" class="bg-white shadow-lg rounded-lg p-6 text-left print:bg-white">
        <div class="flex items-center gap-4 mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Nuxt_logo.svg" class="w-12 h-12" alt="Logo" />
          <div>
            <h2 class="text-2xl font-bold text-green-600">Nuxt Store Receipt</h2>
            <p class="text-sm text-gray-500">Order Confirmation</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-sm text-gray-500">Order ID</p>
            <p class="font-medium">#{{ receiptData.id }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Date</p>
            <p class="font-medium">{{ new Date(receiptData.date).toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Payment Method</p>
            <p class="font-medium">{{ receiptData.method.toUpperCase() }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Status</p>
            <p class="font-medium text-green-600">Completed</p>
          </div>
        </div>

        <hr class="my-4 border-gray-200" />

        <h3 class="font-semibold mb-2">Order Details</h3>
        <div v-for="item in receiptData.items" :key="item.id" class="flex justify-between py-2 border-b border-gray-100">
          <div>
            <span class="font-medium">{{ item.title }}</span>
            <span class="text-sm text-gray-500 block">Qty: {{ item.quantity }}</span>
          </div>
          <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>

        <div class="mt-4 space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal</span>
            <span>${{ receiptData.total.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Shipping</span>
            <span>Free</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Tax</span>
            <span>$0.00</span>
          </div>
        </div>

        <hr class="my-4 border-gray-200" />
        <div class="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${{ receiptData.total.toFixed(2) }}</span>
        </div>
      </div>

      <div class="flex justify-center gap-4">
        <button @click="printReceipt" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Receipt
        </button>
        <button @click="downloadPDF" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>

    <div v-else>
      <div v-if="cart.items.length === 0" class="text-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-gray-600 text-lg mt-4">Your cart is empty.</p>
        <NuxtLink to="/products" class="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Browse products
        </NuxtLink>
      </div>

      <div v-else>
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-lg md:text-xl font-semibold mb-4">Order Summary</h2>
          <div v-for="item in cart.items" :key="item.id" class="flex justify-between py-3 border-b">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                <span class="text-gray-500 text-sm">Image</span>
              </div>
              <div>
                <p class="font-medium text-[10px] md:text-sm">{{ item.title }}</p>
                <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
              </div>
            </div>
            <p class="font-medium text-sm">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>

          <div class="mt-4 space-y-2 text-sm md:text-base">
            <div class="flex justify-between text-sm md:text-base">
              <span class="text-gray-600  ">Subtotal</span>
              <span>${{ cart.total.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span>Free</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tax</span>
              <span>$0.00</span>
            </div>
            <div class="flex justify-between border-t pt-2 mt-2">
              <span class="font-semibold">Total</span>
              <span class="font-bold text-lg">${{ cart.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
          
          <div class="grid grid-cols-2 gap-4 mb-6 text-sm md:text-base">
            <button 
              @click="selectedMethod = 'card'"
              :class="{'border-green-500 bg-green-50': selectedMethod === 'card'}"
              class="border rounded-lg p-4 text-center hover:border-green-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Credit/Debit Card</span>
            </button>
            
            <button 
              @click="selectedMethod = 'paypal'"
              :class="{'border-green-500 bg-green-50': selectedMethod === 'paypal'}"
              class="border rounded-lg p-4 text-center hover:border-green-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502zm-2.96-5.09c.762.868.983 1.81.752 3.285-.019.123-.04.24-.062.36-.735 3.773-3.089 5.446-6.956 5.446H8.957c-.63 0-1.174.414-1.354 1.002l-.014-.002-.93 5.894H3.121a.051.051 0 0 1-.05-.06l2.598-16.51A.95.95 0 0 1 6.607 2h5.976c2.183 0 3.716.469 4.523 1.388z"/>
              </svg>
              <span>PayPal</span>
            </button>
            
            <button 
              @click="selectedMethod = 'bank'"
              :class="{'border-green-500 bg-green-50': selectedMethod === 'bank'}"
              class="border rounded-lg p-4 text-center hover:border-green-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <span>Bank Transfer</span>
            </button>
            
            <button 
              @click="selectedMethod = 'crypto'"
              :class="{'border-green-500 bg-green-50': selectedMethod === 'crypto'}"
              class="border rounded-lg p-4 text-center hover:border-green-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Crypto</span>
            </button>
          </div>

        
          <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

         
          <div v-if="selectedMethod === 'card'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input 
                v-model="cardNumber" 
                @input="formatCardNumber"
                type="text" 
                placeholder="1234 5678 9012 3456" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                maxlength="19"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input 
                v-model="cardName" 
                type="text" 
                placeholder="John Smith" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
              />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <div class="flex gap-2">
                  <input 
                    v-model="expiryMonth" 
                    type="text" 
                    placeholder="MM" 
                    class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    maxlength="2"
                  />
                  <input 
                    v-model="expiryYear" 
                    type="text" 
                    placeholder="YY" 
                    class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    maxlength="2"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input 
                  v-model="cvv" 
                  type="text" 
                  placeholder="123" 
                  class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  maxlength="4"
                />
              </div>
            </div>
            
            <div class="flex items-center gap-2 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span class="text-[9px] md:text-sm text-gray-500">Your payment details are encrypted and secure</span>
            </div>
          </div>


          <div v-if="selectedMethod === 'paypal'" class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
              <p class="text-sm text-blue-800">You will be redirected to PayPal to complete your payment securely.</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
              <input 
                v-model="paypalEmail" 
                type="email" 
                placeholder="your@email.com" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
              />
            </div>
          </div>

          <div v-if="selectedMethod === 'bank'" class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <p class="text-sm text-gray-800">Please transfer the exact amount to our bank account. Your order will be processed after we receive the payment.</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"> Account Number</label>
              <input 
                v-model="bankAccount" 
                type="text" 
                placeholder="1234567890" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
              <input 
                v-model="bankName" 
                type="text" 
                placeholder="John Smith" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
              />
            </div>
            
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <select 
                v-model="bankType" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="checking">Current</option>
                <option value="savings">Savings</option>
              </select>
            </div>
          </div>

          <div v-if="selectedMethod === 'crypto'" class="space-y-4">
            <div class="bg-yellow-50 p-4 rounded-lg mb-4">
              <p class="text-sm text-yellow-800">Send the exact amount in cryptocurrency to the wallet address provided after checkout.</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cryptocurrency</label>
              <select 
                v-model="cryptoType" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="litecoin">Litecoin (LTC)</option>
                <option value="usdt">Tether (USDT)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Your Wallet Address</label>
              <input 
                v-model="cryptoWallet" 
                type="text" 
                :placeholder="cryptoType === 'bitcoin' ? '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
              />
            </div>
          </div>

        
          <div v-if="selectedMethod === 'upi'" class="space-y-4">
            <div class="bg-purple-50 p-4 rounded-lg mb-4">
              <p class="text-sm text-purple-800">Enter your UPI ID to complete the payment.</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <input 
                v-model="upiId" 
                type="text" 
                placeholder="name@upi" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
              />
            </div>
          </div>

          <button
            @click="handlePayment"
            :disabled="isPayDisabled"
            :class="{
              'opacity-50 cursor-not-allowed': isPayDisabled,
              'bg-green-600 hover:bg-green-700': !isPayDisabled
            }"
            class="w-full text-white px-6 py-3 rounded-lg transition-colors mt-6 flex items-center justify-center gap-2"
          >
            
            Pay ${{ cart.total.toFixed(2) }} Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


