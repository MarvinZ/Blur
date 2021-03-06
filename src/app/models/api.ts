export class IUser {
    id: number
    firstName: string
    lastName: string
    userName: string
    userType: string
    selectedSubagent: number
    profilePictureUrl: string
}

export class LoginResponse {
    constructor(
        public ResponseStatus: ResponseStatus,
        public ResponseAgentInfo: ResponseAgentInfo
    ) { }

}

export class ResponseStatus { //shared accross all methods of the API
    constructor(
        public Status: string,
        public ResponseMethod: string,
        public ResultDateTime: string
    ) { }
}


export class ResponseAgentInfo {
    constructor(
        public Agent: string,
        public IdAgent: number
    ) { }
}

export class ResponseInfo {
    constructor(
        public SSport: string,
        public ListSport: number,

        public ListExposure: number,
        public CurrencyCombo: number,
        public _bErrorCode: number,
        public _sErrorMsg: number,
        public _sErrorMsgKey: number,
        public _sErrorMsgParams: number
    ) { }
}


export class ReportResponse {
    constructor(
        public ResponseStatus: ResponseStatus,
        public ResponseInfo: ResponseAgentInfo
    ) { }

}



