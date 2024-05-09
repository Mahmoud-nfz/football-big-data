import sched
import time
from threading import Thread
from src.batch.yellow_red_cards_teams import yellow_red_cards_teams
from src.db.RDBM import RethinkDBManager
from src.batch.goal_scoring_players import goal_scoring_players
from src.batch.goal_scoring_teams import goal_scoring_teams
from src.batch.gpg_teams import gpg_teams
from src.batch.games_played_players import games_played_players
from src.batch.shots_on_target_percentage import shots_on_target_percentage_players
from src.batch.yellow_red_cards_players import yellow_red_cards_players
from src.batch.player_clubs import player_clubs
from src.batch.matches import matches
from src.kafka.consume import consume_from_kafka

# If you want to add more functions to be run at specific intervals add them here with the desired interval in seconds
function_intervals = {
    goal_scoring_teams: 90,
    goal_scoring_players: 60,
    shots_on_target_percentage_players: 100,
    games_played_players: 80,
    gpg_teams: 80,
    yellow_red_cards_players:110,
    # yellow_red_cards_teams:110,
    player_clubs: 110,
    matches: 50,
}


# Define a function to schedule a function to run periodically    
def periodic(scheduler, interval, action, actionargs=()):
    scheduler.enter(interval, 1, periodic, (scheduler, interval, action, actionargs))
    try:
        action(*actionargs)
    except Exception as e:
        print("Periodic job failed: ", e)


def batch_processing():
    rdbm = RethinkDBManager()
    rdbm.init()
    
    # Create a scheduler object
    scheduler = sched.scheduler(time.time, time.sleep)

    # Schedule the functions
    for func, interval in function_intervals.items():
        periodic(scheduler, interval, func)

    # Run the scheduler
    scheduler.run(blocking=True)


def streaming_processing():
    consume_from_kafka()


def main():
    # Create threads for streaming processing and periodic batch processing
    threads = [Thread(target=batch_processing), Thread(target=streaming_processing)]

    # Start the threads
    for thread in threads:
        thread.start()

    # Wait for threads to finish
    for thread in threads:
        thread.join()

if __name__ == "__main__":
    main()
