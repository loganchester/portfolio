package ca.utoronto.utsc.springbootneo4ja1.resource;

import ca.utoronto.utsc.springbootneo4ja1.exceptions.MissingInformationException;
import ca.utoronto.utsc.springbootneo4ja1.exceptions.NotInDBException;
import ca.utoronto.utsc.springbootneo4ja1.model.*;
import ca.utoronto.utsc.springbootneo4ja1.service.ActorService;
import ca.utoronto.utsc.springbootneo4ja1.service.MovieService;
import ca.utoronto.utsc.springbootneo4ja1.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class APIResource {

    @Autowired
    ActorService actorService;

    @Autowired
    MovieService movieService;

    @Autowired
    RelationshipService relationshipService;

    @GetMapping("/getActor")
    public Actor getActor(@RequestBody Actor actor) {
        if (actor.getActorId() == null) {
            throw new MissingInformationException();
        }
        Actor act = actorService.getActor(actor.getActorId());
        if (act == null) {
            throw new NotInDBException();
        }
        return act;
    }

    @PutMapping("/addActor")
    public void addActor(@RequestBody Actor actor) {
        if (actor.getActorId() == null || actor.getName() == null) {
            throw new MissingInformationException();
        }
        actorService.addActor(actor.getActorId(), actor.getName());
    }

    @GetMapping("/getMovie")
    public Movie getMovie(@RequestBody Movie movie) {
        if (movie.getMovieId() == null) {
            throw new MissingInformationException();
        }
        Movie mov = movieService.getMovie(movie.getMovieId());
        if (mov == null) {
            throw new NotInDBException();
        }
        return mov;
    }

    @PutMapping("/addMovie")
    public void addMovie(@RequestBody Movie movie) {
        if (movie.getMovieId() == null || movie.getName() == null) {
            throw new MissingInformationException();
        }
        movieService.addMovie(movie.getMovieId(), movie.getName());
    }

    @PutMapping("/addRelationship")
    public void addRelationship(@RequestBody Relationship rel) {
        if (rel.getActorId() == null || rel.getMovieId() == null) {
            throw new MissingInformationException();
        }
        Actor actor = actorService.getActor(rel.getActorId());
        Movie movie = movieService.getMovie(rel.getMovieId());
        relationshipService.addRelationship(actor, movie);
    }

    @GetMapping("/hasRelationship")
    public Relationship hasRelationship(@RequestBody Relationship rel) {
        if (rel.getActorId() == null || rel.getMovieId() == null) {
            throw new MissingInformationException();
        }
        Relationship relationship = relationshipService.getRelationship(rel.getActorId(), rel.getMovieId());
        if (relationship == null) {
            throw new NotInDBException();
        }
        return relationship;
    }

    @GetMapping("/computeBaconNumber")
    public BaconNumber computeBaconNumber(@RequestBody Actor actor) {
        Actor act = getActor(actor);
        BaconNumber bn = relationshipService.computeBaconNumber(actor.getActorId());
        if (bn.getBaconNumber().equals("0") && !act.getName().equals("Kevin Bacon")) {
            throw new NotInDBException();
        }
        return bn;
    }

    @GetMapping("/computeBaconPath")
    public BaconPath computeBaconPath(@RequestBody Actor actor) {
        BaconPath bp = relationshipService.computeBaconPath(actor.getActorId());
        if (bp.getBaconPath().isEmpty()) {
            throw new NotInDBException();
        }
        return bp;
    }
}
