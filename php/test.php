This is content above the code
<?php
$name = 'Alex';
$fullName = $name . 'Ngo';

class Person {
    protected $name;

    public function __construct($n) {
        $this->name = $n;
    }

    public function getName() {
        return $this->name;
    }
}

function foo() {
    echo "Hey this is a function named foo\n";
}

echo "Hello $name\n";
foo();
?>
This is content below the code