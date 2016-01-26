<?php
class Messages {
    protected $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function getAll() {
        $sql = 'select * from message limit 10';
        $stmt = $this->conn->prepare($sql);
        $success = $stmt->execute();
        
        if(!$success) {
            trigger_error($stmt->errorInfo());
            return false;
        } else {
            return $stmt->fetchAll();
        }
    }
}
?>