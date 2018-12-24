<?php

require_once 'config.php';

$sqlTopCommenters = "SELECT User,
             COUNT(User) AS Comments
    FROM     comments
    GROUP BY User
    ORDER BY Comments DESC
    LIMIT 10;";
$result1 = $conn->query($sqlTopCommenters);

$sqlTopPosters = "SELECT User,
             COUNT(User) AS Posts
    FROM     posts
    GROUP BY User
    ORDER BY Posts DESC
    LIMIT 10;";
$result2 = $conn->query($sqlTopPosters);

$sqlTopPosts = "SELECT (select posts.Title from posts where p_id=id) as Post,
             COUNT(p_id) AS Comments
    FROM     comments
    GROUP BY p_id
    ORDER BY Comments DESC
    LIMIT 10;";
$result3 = $conn->query($sqlTopPosts);

$mostRecentTopics = "select Title,Date from posts order by Date DESC Limit 10";
$result4 = $conn->query($mostRecentTopics);

if($result1->num_rows === 0 && $result2->num_rows === 0 && $result3->num_rows === 0 && $result4->num_rows === 0) {
    echo "not found";
}
else {
    $count1 = $result1->num_rows;
    $count2 = $result2->num_rows;
    $count3 = $result3->num_rows;
    $count4 = $result4->num_rows;
    $x = 0;
    echo "{\"comments\":[";
    while ($row = mysqli_fetch_array($result1))
    {
        $user = $row['User'];
        $comments = $row['Comments'];
        if ($x == $count1 - 1) {
            echo "{\"user\":\"$user\", \"cmts\":\"$comments\" }";
        }
        else
        {
            echo "{\"user\":\"$user\", \"cmts\":\"$comments\" } ,";
        }
        $x++;
    }
    echo "],";
    echo "\"posts\":[";
    $x = 0;
    while ($row = mysqli_fetch_array($result3))
    {
        $post = $row['Post'];
        $comments = $row['Comments'];
        if ($x == $count3 - 1) {
            echo "{\"post\":\"$post\", \"cmts\":\"$comments\" }";
        }
        else
        {
            echo "{\"post\":\"$post\", \"cmts\":\"$comments\" } ,";
        }
        $x++;
    }
    echo "],";
    echo "\"recent\":[";
    $x = 0;
    while ($row = mysqli_fetch_array($result4))
    {
        $post = $row['Title'];
        $date= $row['Date'];
        if ($x == $count4 - 1) {
            echo "{\"post\":\"$post\", \"date\":\"$date\" }";
        }
        else
        {
            echo "{\"post\":\"$post\", \"date\":\"$date\" } ,";
        }
        $x++;
    }
    echo "],";
    echo "\"posters\":[";
    $x=0;
    while ($row = mysqli_fetch_array($result2))
    {
        $user = $row['User'];
        $comments = $row['Posts'];
        if ($x == $count2 - 1) {
            echo "{\"user\":\"$user\", \"psts\":\"$comments\" }";
        }
        else
        {
            echo "{\"user\":\"$user\", \"psts\":\"$comments\" } ,";
        }
        $x++;
    }
    echo "]}";
}

$conn->close();