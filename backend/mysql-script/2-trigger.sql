USE letx;

DELIMITER //
CREATE PROCEDURE update_trainer_average_rating(IN trainer_user_id VARCHAR(36))
BEGIN
    UPDATE trainer SET average_rating = (
		SELECT CAST(SUM(review.rating)/COUNT(review.id) AS DECIMAL(3,2))
		FROM review
		WHERE review.trainer_user_id = trainer_user_id
    ) WHERE trainer.user_id = trainer_user_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_review_insert AFTER INSERT ON review
FOR EACH ROW
BEGIN
	CALL update_trainer_average_rating(NEW.trainer_user_id);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_review_update AFTER UPDATE ON review
FOR EACH ROW
BEGIN
	CALL update_trainer_average_rating(NEW.trainer_user_id);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trigger_review_delete AFTER DELETE ON review
FOR EACH ROW
BEGIN
	CALL update_trainer_average_rating(OLD.trainer_user_id);
END //
DELIMITER ;