<?php
$name = $_POST['name'];
$gender = $_POST['gender'];
$date = $_POST['date'];
$grade = $_POST['grade'];
$contactNumber = $_POST['contactNumber'];
$email = $_POST['email'];
$comment = $_POST['comment'];

//! Database Connection
$conn = new mysqli("localhost", "root", "", "tma");

if ($conn->connect_error) {
  die("Connection Failed : " . $conn->connect_error);
} else {
  $response = $conn->prepare('INSERT INTO registration(name, gender, date, grade, contactNumber, email, comment)
  VALUES(?, ?, ?, ?, ?, ?, ?)');

  // to prevent SQL Injection
  $response->bind_param("sssssss", $name, $gender, $date, $grade, $contactNumber, $email, $comment);
  $response->execute();
  echo "Thank You $name For Applying 🎉, <a href='/tma'>Go back to home</a>";

  $response->close();
  $conn->close();
}
