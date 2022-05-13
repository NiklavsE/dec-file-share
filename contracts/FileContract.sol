pragma solidity ^0.8.0;

contract FileContract {
    struct File {
        string ipfsHash; // IPFS hash
        string name; // file name
        uint256 uploadedOn; // Uploaded timestamp
    }

    // Maps owner to their files
    mapping(address => File[]) public ownerToFiles;

    // Maps owner to their shared files
    mapping(address => File[]) public sharedToFiles;

    event LogFileUploaded(
        address indexed _owner,
        string _ipfsHash,
        string _name,
        uint256 _uploadedOn
    );

    event LogFileShared(
        address indexed _owner,
        address indexed _receiver,
        string _ipfsHash,
        string _name,
        uint256 _uploadedOn
    );


    function uploadFile(
        string memory _ipfsHash,
        string memory _name
    ) public returns (bool _success) {
        require(bytes(_ipfsHash).length == 46);
        require(bytes(_name).length > 0 && bytes(_name).length <= 256);

        uint256 uploadedOn = block.timestamp;
        File memory file = File(_ipfsHash, _name, uploadedOn);

        ownerToFiles[msg.sender].push(file);

        emit LogFileUploaded(
            msg.sender,
            _ipfsHash,
            _name,
            uploadedOn
        );

        _success = true;
    }

    function getFileCount(address _owner)
        public
        view
        returns (uint256)
    {
        require(_owner != address(0x0));
        return ownerToFiles[_owner].length;
    }

    function getFile(address _owner, uint8 _index)
        public
        view
        returns (
            string memory _ipfsHash,
            string memory _name,
            uint256 _uploadedOn
        )
    {
        require(_owner != address(0x0));
        require(_index >= 0 && _index <= 2**8 - 1);
        require(ownerToFiles[_owner].length > 0);

        File storage file = ownerToFiles[_owner][_index];

        return (file.ipfsHash, file.name, file.uploadedOn);
    }

    function shareFile(
        address _receiver, 
        uint8 _index
    ) public returns (bool _success) {

        require(_receiver != address(0x0));
        require(_index >= 0 && _index <= 2**8 - 1);
        require(ownerToFiles[msg.sender].length > 0);

        File memory file = ownerToFiles[msg.sender][_index];

        sharedToFiles[_receiver].push(file);

        emit LogFileShared(
            msg.sender,
            _receiver,
            file.ipfsHash,
            file.name,
            file.uploadedOn
        );

        _success = true;
    }

    function getSharedFileCount(address _receiver)
        public
        view
        returns (uint256)
    {
        require(_receiver != address(0x0));
        return sharedToFiles[_receiver].length;
    }

    function getSharedFile(address _receiver, uint8 _index)
        public
        view
        returns (
            string memory _ipfsHash,
            string memory _name,
            uint256 _uploadedOn
        )
    {
        require(_receiver != address(0x0));
        require(_index >= 0 && _index <= 2**8 - 1);
        require(sharedToFiles[_receiver].length > 0);

        File storage file = sharedToFiles[_receiver][_index];

        return (file.ipfsHash, file.name, file.uploadedOn);
    }
}
