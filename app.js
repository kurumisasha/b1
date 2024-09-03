document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const voucherDetails = document.getElementById('voucherDetails');
    const cardNumberInput = document.getElementById('cardNumber');

    // Set the Campaign ID and Time Zone as constants
    const campaignId = 'LR0EXHF'; // Ganti sesuai dengan Campaign ID
    const timeZone = 'MIDBRQO7MY'; // Ganti sesuai dengan Time Zone

    generateButton.addEventListener('click', function () {
        const cardNumber = cardNumberInput.value.trim();

        if (!cardNumber) {
            alert('Please enter a card number');
            return;
        }

        fetchVoucherDetails(campaignId, cardNumber, timeZone);
    });

    function fetchVoucherDetails(campaignId, cardNumber, timeZone) {
        const url = `https://api.teeg.cloud/vouchers/campaigns/${campaignId}/cards/${cardNumber}?tz=${timeZone}`;
        const accessToken = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imp0X1htek9Od2NqTlg0VFhjTjRvMUhNM2k5aUtpczlpSGgxYTllcEdENGsiLCJ0eXAiOiJKV1QifQ...'; // Ganti dengan token Anda

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching voucher');
                }
                return response.json();
            })
            .then(data => {
                voucherDetails.innerHTML = `
                    <p><strong>Card Number:</strong> ${data.card_number}</p>
                    <p><strong>Voucher Amount:</strong> ${data.amount}</p>
                    <p><strong>Expiry Date:</strong> ${data.expiry_date}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching voucher details:', error);
                voucherDetails.innerHTML = '<p>Failed to fetch voucher details. Please try again later.</p>';
            });
    }
});
