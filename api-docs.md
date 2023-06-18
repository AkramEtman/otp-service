## OTP Service API

default base URL : http://localhost:4444

### Send OTP
```http
POST /otp/send
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `mobile` | `string` | **Required**.Target mobile number |


### Verify OTP
```http
POST /otp/verify
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `mobile` | `string` | **Required**.Target mobile number |
| `otp` | `string` | **Required** provided OTP to be checked |